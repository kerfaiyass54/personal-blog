import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateLessonRequest } from '../../models/lesson.model';
import {LessonService} from "../services/lesson.service";

@Component({
  selector: 'app-add-lessons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-lessons.component.html',
  styleUrl: './add-lessons.component.scss',
})
export class AddLessonsComponent {

  private readonly lessonService = inject(LessonService);

  lesson: CreateLessonRequest = {
    title: '',
    content: ''
  };

  loading = false;
  successMessage = '';

  createLesson(): void {

    if (!this.lesson.title.trim()) {
      return;
    }

    this.loading = true;

    this.lessonService
      .createLesson(this.lesson)
      .subscribe({
        next: () => {

          this.successMessage =
            'Lesson created successfully 🚀';

          this.lesson = {
            title: '',
            content: ''
          };

          this.loading = false;

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
