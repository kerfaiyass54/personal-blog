export interface CreateLessonReadingRequest {
  lessonId: string;
  emailUser: string;
}

export interface UpdateProgressRequest {
  progress: number;
}

export interface LessonReadingResponse {
  id: string;
  lessonName: string;
  emailUser: string;
  dateLastRead: string;
  progress: number;
  read: boolean;
}
