import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  ReaderService,
  ArticleDisplayDTO,
  SavedDTO
} from '../services/reader.service';

@Component({
  selector: 'app-saved-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-articles.component.html',
  styleUrl: './saved-articles.component.scss',
})
export class SavedArticlesComponent implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  savedArticles = signal<ArticleDisplayDTO[]>([]);
  savedRecords = signal<SavedDTO[]>([]);
  loading = signal(true);

  readonly email =
    sessionStorage.getItem('email') ?? '';

  ngOnInit(): void {
    this.loadSavedArticles();
  }

  loadSavedArticles(): void {

    this.readerService
      .getSavedArticles(this.email)
      .subscribe({

        next: (savedRecords) => {

          this.savedRecords.set(savedRecords);

          if (savedRecords.length === 0) {

            this.savedArticles.set([]);
            this.loading.set(false);
            return;
          }

          const articleRequests = savedRecords.map(
            saved =>
              this.readerService.getArticle(
                saved.articleId
              )
          );

          forkJoin(articleRequests)
            .subscribe({

              next: (articles) => {

                this.savedArticles.set(
                  articles
                );

                this.loading.set(false);
              },

              error: () => {

                this.loading.set(false);

                this.toastr.error(
                  'Unable to load saved articles'
                );
              }
            });
        },

        error: () => {

          this.loading.set(false);

          this.toastr.error(
            'Unable to load saved articles'
          );
        }
      });
  }

  readArticle(id: string): void {

    this.router.navigate([
      '/reader/read-article',
      id
    ]);
  }

  removeArticle(articleId: string): void {

    this.readerService
      .removeSavedArticle(
        this.email,
        articleId
      )
      .subscribe({

        next: () => {

          this.toastr.success(
            'Removed from saved articles'
          );

          this.loadSavedArticles();
        },

        error: () => {

          this.toastr.error(
            'Unable to remove article'
          );
        }
      });
  }
}
