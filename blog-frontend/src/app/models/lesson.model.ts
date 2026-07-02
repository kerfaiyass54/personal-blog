export interface LessonResponse {
  id: string;
  title: string;
  content: string;
  dateInsert: string;
}

export interface CreateLessonRequest {
  title: string;
  content: string;
}

export interface UpdateLessonRequest {
  title: string;
  content: string;
}

export interface Lesson {
  id: string;

  title: string;

  content: string;

  dateInsert?: string;
}
