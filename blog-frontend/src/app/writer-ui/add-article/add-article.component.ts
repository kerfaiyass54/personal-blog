import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from '../services/articles.service';
import {Mistake, ReviewService} from "../services/review.service";
declare const bootstrap: any;


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
  private readonly reviewService =
    inject(ReviewService);
  reviewLoading = signal(false);

  mistakes = signal<Mistake[]>([]);
  title = signal('');
  content = signal('');

  loading = signal(false);

  correctArticle(): void {

    if (!this.content().trim()) {

      this.toastr.warning(
        'Content is required'
      );

      return;
    }

    this.reviewLoading.set(true);

    this.reviewService
      .reviewArticle(this.content())
      .subscribe({

        next: (response) => {

          this.mistakes.set(
            response.mistakes
          );

          this.reviewLoading.set(false);

          const modal =
            new bootstrap.Modal(
              document.getElementById(
                'correctionsModal'
              )
            );

          modal.show();
        },

        error: () => {

          this.reviewLoading.set(false);

          this.toastr.error(
            'Unable to review article'
          );
        }
      });
  }

  applyCorrection(
    mistake: Mistake
  ): void {

    if (
      !mistake.original ||
      !mistake.correction
    ) {
      return;
    }

    const updatedContent =
      this.content().replace(
        mistake.original,
        mistake.correction
      );

    this.content.set(
      updatedContent
    );

    this.mistakes.update(
      mistakes =>
        mistakes.filter(
          m => m !== mistake
        )
    );

    this.toastr.success(
      'Correction applied'
    );
  }

  applyAllCorrections(): void {

    let updatedContent =
      this.content();

    for (
      const mistake of this.mistakes()
      ) {

      if (
        !mistake.original ||
        !mistake.correction
      ) {
        continue;
      }

      updatedContent =
        updatedContent.replace(
          mistake.original,
          mistake.correction
        );
    }

    this.content.set(
      updatedContent
    );

    this.mistakes.set([]);

    this.toastr.success(
      'All corrections applied'
    );
  }

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
