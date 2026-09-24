import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {ReaderDashboardStatistics, ReaderStatisticsService} from "../services/reader-statistics.service";


@Component({
  selector: 'app-reader-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reader-dashboard.component.html',
  styleUrl: './reader-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReaderDashboardComponent implements OnInit {

  private statisticsService = inject(ReaderStatisticsService);
  private cdr = inject(ChangeDetectorRef);

  stats?: ReaderDashboardStatistics;
  loading = true;

  ngOnInit(): void {

    const email = sessionStorage.getItem('email');

    if (!email) {
      this.loading = false;
      return;
    }

    this.statisticsService
      .getDashboardStatistics(email)
      .subscribe({
        next: (data) => {
          this.stats = data;
          this.cdr.markForCheck();
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
  }
}
