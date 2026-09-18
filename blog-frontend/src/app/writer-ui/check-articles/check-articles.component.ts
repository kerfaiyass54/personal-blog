import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesService, ArticleDisplayDTO } from '../services/articles.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-articles.component.html',
  styleUrl: './check-articles.component.scss',
})
export class CheckArticlesComponent implements OnInit {

  articles: ArticleDisplayDTO[] = [];

  constructor(private articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        console.error(err);
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

  onDelete(articleId: string): void {

    if (!confirm('Delete this article?')) {
      return;
    }

    this.articlesService.deleteArticle(articleId).subscribe({
      next: () => {
        this.loadArticles();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
