import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ReaderService,
  ArticleDisplayDTO
} from '../services/reader.service';
import { ChangeDetectorRef } from '@angular/core';


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
  private readonly cdr = inject(ChangeDetectorRef);

  articles = signal<ArticleDisplayDTO[]>([]);
  loading = signal(true);
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

  openSavedArticles(): void {
    this.router.navigate(['/reader/saved-articles']);
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

        },

        error: () => {

          this.toastr.warning(
            'Article already saved'
          );
        }
      });
  }

  isArticleSaved(articleId: string): boolean {
    if (!this.email) {
      return false;
    }
    let isSaved = false;
    this.readerService
      .isArticleSaved(
        this.email,
        articleId
      )
      .subscribe({
        next: (saved) => {
          isSaved = saved;

        }
      });
    return isSaved;
  }

}
