import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LessonResponse } from '../../models/lesson.model';
import { LessonReadingResponse } from '../../models/lesson-reading.model';
import {LessonService} from "../../writer-ui/services/lesson.service";
import {LessonReadingService} from "../services/lesson-reading.service";

@Component({
  selector: 'app-check-lessons-to-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-lessons-to-read.component.html',
  styleUrl: './check-lessons-to-read.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckLessonsToReadComponent implements OnInit {

  private readonly lessonService = inject(LessonService);
  private readonly readingService = inject(LessonReadingService);
  selectedTab: 'all' | 'reading' | 'completed' = 'all';

  lessons: LessonResponse[] = [];

  readingLessons: LessonReadingResponse[] = [];

  completedLessons: LessonReadingResponse[] = [];

  emailUser = sessionStorage.getItem('email') ?? '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.lessonService
      .getAllLessons()
      .subscribe({
        next: data => {
          this.lessons = data;
          this.cdr.markForCheck();
        },
        error: () => this.cdr.markForCheck()
      });

    if (!this.emailUser) {
      this.cdr.markForCheck();
      return;
    }

    this.readingService
      .getReadingsByUser(this.emailUser)
      .subscribe({
        next: data => {
          this.readingLessons = data.filter(x =>
            x.progress > 0 && x.progress < 100
          );
          this.cdr.markForCheck();
        },
        error: () => this.cdr.markForCheck()
      });

    this.readingService
      .getCompletedLessons(this.emailUser)
      .subscribe({
        next: data => {
          this.completedLessons = data;
          this.cdr.markForCheck();
        },
        error: () => this.cdr.markForCheck()
      });
  }
}
