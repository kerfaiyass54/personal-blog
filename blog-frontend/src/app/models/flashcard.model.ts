import { FlashcardType } from './flashcard-type.enum';

export interface Flashcard {
  id?: string;

  lessonId: string;

  lessonTitle: string;

  type: FlashcardType;

  term: string;

  value: string;
}
