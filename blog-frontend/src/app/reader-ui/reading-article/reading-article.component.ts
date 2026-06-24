import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ReaderService,
  ArticleDisplayDTO
} from '../services/reader.service';

@Component({
  selector: 'app-reading-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reading-article.component.html',
  styleUrl: './reading-article.component.scss',
})
export class ReadingArticleComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly readerService = inject(ReaderService);

  article = signal<ArticleDisplayDTO | null>(null);
  loading = signal(true);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/reader/check-articles']);
      return;
    }

    this.readerService.getArticle(id).subscribe({
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

        this.router.navigate([
          '/reader/check-articles'
        ]);
      }
    });
  }

  goBack(): void {

    this.router.navigate([
      '/reader/check-articles'
    ]);
  }
}
