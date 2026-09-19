import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ReaderService,
  ArticleDisplayDTO,
  SavedDTO
} from '../services/reader.service';

@Component({
  selector: 'app-checking-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checking-articles.component.html',
  styleUrl: './checking-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckingArticlesComponent implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  articles = signal<ArticleDisplayDTO[]>([]);
  savedArticles = signal<SavedDTO[]>([]);
  loading = signal(true);
  savedLoading = signal(false);
  errorMessage = signal('');

  readonly email =
    sessionStorage.getItem('email') ?? '';

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.readerService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Articles could not be loaded right now.');
        this.toastr.error('Failed to load articles');
      }
    });
  }

  loadSavedArticles(): void {
    if (!this.email) {
      this.toastr.warning('Sign in to view saved articles');
      return;
    }

    this.savedLoading.set(true);
    this.readerService
      .getSavedArticles(this.email)
      .subscribe({
        next: (saved) => {
          this.savedArticles.set(saved);
          this.savedLoading.set(false);
        },
        error: () => {
          this.savedLoading.set(false);
          this.toastr.error('Failed to load saved articles');
        }
      });
  }

  readArticle(id: string): void {

    this.router.navigate([
      '/reader/read-article',
      id
    ]);
  }

  saveArticle(articleId: string): void {
    if (!this.email) {
      this.toastr.warning('Sign in to save articles');
      return;
    }
    this.readerService
      .saveArticle(
        this.email,
        articleId
      )
      .subscribe({

        next: () => {

          this.toastr.success(
            'Article saved successfully'
          );

          this.loadSavedArticles();
        },

        error: () => {

          this.toastr.warning(
            'Article already saved'
          );
        }
      });
  }

  removeSavedArticle(
    articleId: string
  ): void {
    if (!this.email) {
      this.toastr.warning('Sign in to manage saved articles');
      return;
    }
    this.readerService
      .removeSavedArticle(
        this.email,
        articleId
      )
      .subscribe({

        next: () => {

          this.toastr.success(
            'Removed from saved'
          );

          this.loadSavedArticles();
        }
      });
  }
}
