export interface CreateLessonReadingRequest {
  lessonId: string;
  emailUser: string;
}

export interface UpdateProgressRequest {
  progress: number;
}

export interface LessonReadingResponse {
  id: string;
  lessonId: string;
  emailUser: string;
  dateLastRead: string;
  progress: number;
  read: boolean;
}
