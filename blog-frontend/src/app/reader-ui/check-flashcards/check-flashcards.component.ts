import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../services/flashcard.service';

declare const bootstrap: any;

@Component({
  selector: 'app-check-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-flashcards.component.html',
  styleUrl: './check-flashcards.component.scss'
})
export class CheckFlashcardsComponent implements OnInit {

  private readonly flashcardService =
    inject(FlashcardService);

  flashcards: Flashcard[] = [];

  selectedFlashcard?: Flashcard;

  loading = true;

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
        },

        error: err => {

          console.error(
            'Error loading flashcards',
            err
          );

          this.loading = false;
        }
      });
  }

  openCard(
    flashcard: Flashcard
  ): void {

    this.selectedFlashcard =
      flashcard;

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'flashcardModal'
        )
      );

    modal.show();
  }
}
