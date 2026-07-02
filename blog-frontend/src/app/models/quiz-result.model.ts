export interface QuestionResult {

  question: string;

  selectedAnswer: string;

  correctAnswer: string;

  correct: boolean;
}

export interface QuizResult {

  totalQuestions: number;

  correctAnswers: number;

  scorePercentage: number;

  questions: QuestionResult[];
}
