import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './saved-articles.component.scss',
})
export class SavedArticlesComponent implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly router = inject(Router);


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

              }
            });
        },

        error: () => {

          this.loading.set(false);

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



          this.loadSavedArticles();
        },

        error: () => {


        }
      });
  }
}
