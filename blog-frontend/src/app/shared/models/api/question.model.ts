export interface Question {
  id: string;
  quizId: string;
  content: string;
  answer: string;
  hint: string;
  possibilities: string[];
}
