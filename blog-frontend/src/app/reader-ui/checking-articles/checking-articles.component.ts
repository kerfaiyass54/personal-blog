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
})
export class CheckingArticlesComponent implements OnInit {

  private readonly readerService = inject(ReaderService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  articles = signal<ArticleDisplayDTO[]>([]);
  savedArticles = signal<SavedDTO[]>([]);

  readonly email =
    sessionStorage.getItem('email') ?? '';

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {

    this.readerService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
      }
    });
  }

  loadSavedArticles(): void {

    this.readerService
      .getSavedArticles(this.email)
      .subscribe({
        next: (saved) => {
          this.savedArticles.set(saved);
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
