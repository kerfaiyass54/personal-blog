import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { LessonResponse } from '../../models/lesson.model';
import { Flashcard } from '../../models/flashcard.model';

import { LessonService } from '../services/lesson.service';
import { AiFlashcardService } from '../services/ai-flashcard.service';
import { FlashcardService } from '../services/flashcard.service';

declare const bootstrap: any;

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss'
})
export class LessonDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly lessonService = inject(LessonService);
  private readonly aiService = inject(AiFlashcardService);
  private readonly flashcardService = inject(FlashcardService);

  lesson?: LessonResponse;

  flashcards: Flashcard[] = [];

  loading = true;
  error = false;

  generating = false;
  saving = false;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.lessonService.getLessonById(id)
      .subscribe({
        next: lesson => {
          this.lesson = lesson;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  generateFlashcards(): void {

    if (!this.lesson) {
      return;
    }

    this.generating = true;

    this.aiService.generateFlashcards({
      id: this.lesson.id,
      title: this.lesson.title,
      content: this.lesson.content,
      dateInsert: this.lesson.dateInsert
    }).subscribe({

      next: () => {

        setTimeout(() => {

          this.flashcardService
            .getGeneratedFlashcards()
            .subscribe({

              next: cards => {

                this.flashcards = cards;

                this.generating = false;

                const modal =
                  new bootstrap.Modal(
                    document.getElementById(
                      'flashcardsModal'
                    )
                  );

                modal.show();
              },

              error: err => {
                console.error(err);
                this.generating = false;
              }
            });

        }, 1500);

      },

      error: err => {
        console.error(err);
        this.generating = false;
      }
    });
  }

  saveFlashcards(): void {

    this.saving = true;

    this.flashcardService
      .saveGeneratedFlashcards()
      .subscribe({

        next: () => {

          this.saving = false;

          const modalEl =
            document.getElementById(
              'flashcardsModal'
            );

          const modal =
            bootstrap.Modal.getInstance(
              modalEl
            );

          modal.hide();
        },

        error: err => {
          console.error(err);
          this.saving = false;
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
