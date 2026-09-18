import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillService} from "../../writer-ui/services/skill.service";
import {FavoriteDTO, FavoriteService} from "../services/favorite.service";
import {Skill} from "../../models/skill.model";



@Component({
  selector: 'app-check-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-skills-reader.component.html',
  styleUrl: './check-skills-reader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckSkillsReaderComponent implements OnInit {

  private readonly skillService = inject(SkillService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);

  skills: Skill[] = [];
  favorites: FavoriteDTO[] = [];
  searchTerm = '';
  filteredSkills: Skill[] = [];

  loading = true;

  email = sessionStorage.getItem('email') || '';

  ngOnInit(): void {
    this.loadData();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement)
      .value
      .toLowerCase();

    this.searchTerm = value;

    this.filteredSkills = this.skills.filter(skill =>
      skill.name.toLowerCase().includes(value) ||
      skill.field.toLowerCase().includes(value)
    );

    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredSkills = [...this.skills];
    this.cdr.detectChanges();
  }

  loadData(): void {
    this.loading = true;

    this.skillService.getAllSkills().subscribe({
      next: skills => {
        this.skills = skills;
        this.filteredSkills = [...skills];

        this.favoriteService.getFavoriteSkills(this.email)
          .subscribe({
            next: favorites => {
              this.favorites = favorites;
              this.loading = false;
              this.cdr.detectChanges();
            },
            error: () => {
              this.loading = false;
              this.cdr.detectChanges();
            }
          });
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  isFavorite(skillName: string): boolean {
    return this.favorites.some(
      fav => fav.skillName === skillName
    );
  }

  toggleFavorite(skill: Skill): void {

    if (this.isFavorite(skill.name)) {

      this.favoriteService.removeFavoriteSkill(
        this.email,
        skill.id
      ).subscribe({
        next: () => {

          this.favorites = this.favorites.filter(
            fav => fav.skillName !== skill.name
          );

          this.cdr.detectChanges();
        },
        error: () => {

        }
      });

      return;
    }

    this.favoriteService.addFavoriteSkill(
      this.email,
      skill.id
    ).subscribe({
      next: favorite => {

        this.favorites = [
          ...this.favorites,
          favorite
        ];



        this.cdr.detectChanges();
      },
      error: () => {

      }
    });
  }

  trackBySkill(index: number, skill: Skill): string {
    return skill.id;
  }
}
