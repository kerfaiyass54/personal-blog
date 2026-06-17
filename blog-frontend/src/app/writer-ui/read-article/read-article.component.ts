import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService, ArticleDisplayDTO } from '../services/articles.service';

@Component({
  selector: 'app-read-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-article.component.html',
  styleUrl: './read-article.component.scss',
})
export class ReadArticleComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly articlesService = inject(ArticlesService);

  article = signal<ArticleDisplayDTO | null>(null);

  loading = signal(true);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/writer/list-articles']);
      return;
    }

    this.articlesService.getArticle(id).subscribe({
      next: (article) => {
        this.article.set(article);
        this.loading.set(false);
      },

      error: () => {

        this.loading.set(false);

        this.toastr.error(
          'Unable to load article',
          'Error'
        );

        this.router.navigate(['/writer/list-articles']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/writer/list-articles']);
  }
}
