import { Flashcard } from './flashcard.model';

export interface GenerationResponse {
  count: number;
  flashcards: Flashcard[];
}
