import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.scss',
})
export class UpdateArticleComponent implements OnInit {

  private readonly articlesService = inject(ArticlesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

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

        this.toastr.error(
          'Unable to load article',
          'Error'
        );

        this.router.navigate(['/articles']);
      }
    });
  }

  update(): void {

    if (!this.title().trim()) {
      this.toastr.warning('Title is required');
      return;
    }

    if (!this.content().trim()) {
      this.toastr.warning('Content is required');
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

        this.toastr.success(
          'Article updated successfully',
          'Success'
        );

        this.router.navigate(['/writer/read-article', this.articleId]);
      },

      error: () => {

        this.saving.set(false);

        this.toastr.error(
          'Unable to update article',
          'Error'
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/writer/read-article', this.articleId]);
  }
}
