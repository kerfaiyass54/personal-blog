export interface UserAnswer {

  questionId: string;

  questionContent: string;

  selectedAnswer: string;

  correctAnswer: string;

  correct: boolean;
}

export interface UserQuizResult {

  id: string;

  userId: string;

  quizId: string;

  lessonId: string;

  lessonTitle: string;

  totalQuestions: number;

  correctAnswers: number;

  scorePercentage: number;

  completedAt: string;

  answers: UserAnswer[];
}
