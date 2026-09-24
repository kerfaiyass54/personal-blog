import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject
} from '@angular/core';

import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../writer-ui/services/flashcard.service';

@Component({
  selector: 'app-check-flashcards',
  standalone: true,
  imports: [],
  templateUrl: './check-flashcards.component.html',
  styleUrl: './check-flashcards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckFlashcardsComponent implements OnInit {

  private readonly flashcardService = inject(FlashcardService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  flashcards: Flashcard[] = [];
  selectedFlashcard: Flashcard | null = null;

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.loading = true;
    this.errorMessage = '';

    this.changeDetectorRef.markForCheck();

    this.flashcardService.getAllFlashcards().subscribe({
      next: (flashcards) => {
        console.log('Flashcards received:', flashcards);

        this.flashcards = flashcards ?? [];
        this.loading = false;

        this.changeDetectorRef.markForCheck();
      },

      error: (error) => {
        console.error('Unable to load flashcards:', error);

        this.flashcards = [];
        this.loading = false;
        this.errorMessage =
          'Unable to load flashcards. Please try again.';

        this.changeDetectorRef.markForCheck();
      }
    });
  }

  openCard(flashcard: Flashcard): void {
    this.selectedFlashcard = flashcard;

    document.body.style.overflow = 'hidden';

    this.changeDetectorRef.markForCheck();
  }

  closeCard(): void {
    this.selectedFlashcard = null;

    document.body.style.overflow = '';

    this.changeDetectorRef.markForCheck();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.selectedFlashcard) {
      this.closeCard();
    }
  }

  trackByFlashcard(
    index: number,
    flashcard: Flashcard
  ): string | number {
    return flashcard.id ?? index;
  }
}
