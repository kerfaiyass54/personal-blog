import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { LessonResponse } from '../../models/lesson.model';
import {LessonService} from "../services/lesson.service";

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss',
})
export class LessonDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly lessonService = inject(LessonService);

  lesson?: LessonResponse;

  loading = true;
  error = false;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.lessonService.getLessonById(id)
      .subscribe({
        next: (lesson) => {
          this.lesson = lesson;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
