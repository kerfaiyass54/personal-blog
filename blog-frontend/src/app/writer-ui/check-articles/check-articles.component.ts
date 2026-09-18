import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesService, ArticleDisplayDTO } from '../services/articles.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-articles.component.html',
  styleUrl: './check-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckArticlesComponent implements OnInit {

  articles: ArticleDisplayDTO[] = [];
  readonly articleToDelete = signal<ArticleDisplayDTO | null>(null);
  readonly deleting = signal(false);

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  onAddArticle(): void {
this.router.navigate(['/writer/add-article']);  }

  onUpdate(article: ArticleDisplayDTO): void {
    this.router.navigate(['/writer/update-article', article.id]);
  }

  onReadArticle(articleId: string): void {
    this.router.navigate(['/writer/read-article', articleId]);
  }

  onDelete(article: ArticleDisplayDTO): void {
    this.articleToDelete.set(article);
  }

  closeDeleteDialog(): void {
    if (!this.deleting()) {
      this.articleToDelete.set(null);
    }
  }

  confirmDelete(): void {
    const article = this.articleToDelete();

    if (!article || this.deleting()) {
      return;
    }

    this.deleting.set(true);
    this.articlesService.deleteArticle(article.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.articleToDelete.set(null);
        this.loadArticles();
      },
      error: (err) => {
        console.error(err);
        this.deleting.set(false);
        this.cdr.markForCheck();
      }
    });
  }
}
