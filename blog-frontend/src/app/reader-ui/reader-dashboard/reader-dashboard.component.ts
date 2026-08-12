import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReaderDashboardStatistics, ReaderStatisticsService} from "../services/reader-statistics.service";


@Component({
  selector: 'app-reader-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reader-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './reader-dashboard.component.scss',
})
export class ReaderDashboardComponent implements OnInit {

  private statisticsService = inject(ReaderStatisticsService);

  stats?: ReaderDashboardStatistics;
  loading = true;

  ngOnInit(): void {

    const email = localStorage.getItem('email');

    if (!email) {
      this.loading = false;
      return;
    }

    this.statisticsService
      .getDashboardStatistics(email)
      .subscribe({
        next: (data) => {
          this.stats = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }
}
