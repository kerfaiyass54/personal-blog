import {Question} from "./question.model";

export interface QuizGenerated {

  lessonId: string;

  lessonTitle: string;

  numberOfQuestions: number;

  questions: Question[];
}
