import { QuestionAnswer } from './question-answer.model';

export interface SubmitQuizRequest {

  userId: string;

  quizId: string;

  answers: QuestionAnswer[];
}
