import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent {

  private readonly articlesService = inject(ArticlesService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  title = signal('');
  content = signal('');

  loading = signal(false);

  submit(): void {

    if (!this.title().trim()) {
      this.toastr.warning('Title is required');
      return;
    }

    if (!this.content().trim()) {
      this.toastr.warning('Content is required');
      return;
    }

    this.loading.set(true);

    this.articlesService.createArticle({
      title: this.title(),
      content: this.content()
    }).subscribe({
      next: () => {

        this.toastr.success(
          'Article created successfully',
          'Success'
        );

        this.loading.set(false);
      },

      error: () => {

        this.loading.set(false);

        this.toastr.error(
          'Unable to create article',
          'Error'
        );
      }
    });
  }
}
