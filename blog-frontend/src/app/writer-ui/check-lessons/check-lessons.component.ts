import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonResponse } from '../../models/lesson.model';
import {LessonService} from "../services/lesson.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-check-lessons',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './check-lessons.component.html',
  styleUrl: './check-lessons.component.scss',
})
export class CheckLessonsComponent implements OnInit {

  private readonly lessonService = inject(LessonService);

  lessons: LessonResponse[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (data) => {
        this.lessons = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  trackByLesson(index: number, lesson: LessonResponse): string {
    return lesson.id;
  }
}
