import { Question } from './question.model';

export interface QuizGenerationResponse {

  lessonId: string;

  lessonTitle: string;

  numberOfQuestions: number;

  questions: Question[];
}
