import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../writer-ui/services/flashcard.service';

declare const bootstrap: any;

@Component({
  selector: 'app-check-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-flashcards.component.html',
  styleUrl: './check-flashcards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckFlashcardsComponent implements OnInit {

  private readonly flashcardService =
    inject(FlashcardService);

  flashcards: Flashcard[] = [];

  selectedFlashcard?: Flashcard;

  loading = true;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.loadFlashcards();
  }

  loadFlashcards(): void {

    this.loading = true;

    this.flashcardService
      .getAllFlashcards()
      .subscribe({

        next: cards => {

          this.flashcards = cards;

          this.loading = false;
          this.cdr.markForCheck();
        },

        error: err => {

          console.error(
            'Error loading flashcards',
            err
          );

          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  openCard(
    flashcard: Flashcard
  ): void {

    this.selectedFlashcard =
      flashcard;

    const modalElement = document.getElementById('flashcardModal');
    if (!modalElement) return;

    new bootstrap.Modal(modalElement).show();
  }
}
