import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { LessonResponse } from '../../models/lesson.model';
import {LessonService} from "../../writer-ui/services/lesson.service";
import {LessonReadingService} from "../services/lesson-reading.service";

@Component({
  selector: 'app-read-lesson',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './read-lesson.component.html',
  styleUrl: './read-lesson.component.scss',
})
export class ReadLessonComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly lessonService = inject(LessonService);
  private readonly lessonReadingService = inject(LessonReadingService);

  lesson?: LessonResponse;

  loading = true;

  progress = 0;

  emailUser = '';

  ngOnInit(): void {

    this.emailUser =
      sessionStorage.getItem('email') ?? '';

    const lessonId =
      this.route.snapshot.paramMap.get('id');

    if (!lessonId) {
      this.loading = false;
      return;
    }

    this.lessonService
      .getLessonById(lessonId)
      .subscribe({
        next: lesson => {

          this.lesson = lesson;

          this.createReading();

          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  createReading(): void {

    if (!this.lesson || !this.emailUser) {
      return;
    }

    this.lessonReadingService
      .createReading({
        lessonId: this.lesson.id,
        emailUser: this.emailUser
      })
      .subscribe({
        next: response => {

          this.progress =
            response.progress;
        },
        error: () => {
          // reading may already exist
        }
      });
  }

  updateProgress(): void {

    if (!this.lesson || !this.emailUser) {
      return;
    }

    this.lessonReadingService
      .updateProgress(
        this.lesson.id,
        this.emailUser,
        {
          progress: this.progress
        }
      )
      .subscribe();
  }

  markCompleted(): void {

    this.progress = 100;

    this.updateProgress();
  }
}
