import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './update-article.component.scss',
})
export class UpdateArticleComponent implements OnInit {

  private readonly articlesService = inject(ArticlesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  articleId = '';

  title = signal('');
  content = signal('');

  loading = signal(true);
  saving = signal(false);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/articles']);
      return;
    }

    this.articleId = id;

    this.articlesService.getArticle(id).subscribe({
      next: (article) => {

        this.title.set(article.title);
        this.content.set(article.content);

        this.loading.set(false);
      },

      error: () => {



        this.router.navigate(['/articles']);
      }
    });
  }

  update(): void {

    if (!this.title().trim()) {
      return;
    }

    if (!this.content().trim()) {
      return;
    }

    this.saving.set(true);

    this.articlesService.updateArticle(
      this.articleId,
      {
        title: this.title(),
        content: this.content()
      }
    ).subscribe({

      next: () => {

        this.saving.set(false);



        this.router.navigate(['/writer/read-article', this.articleId]);
      },

      error: () => {

        this.saving.set(false);



      }
    });
  }

  goBack(): void {
    this.router.navigate(['/writer/read-article', this.articleId]);
  }
}
