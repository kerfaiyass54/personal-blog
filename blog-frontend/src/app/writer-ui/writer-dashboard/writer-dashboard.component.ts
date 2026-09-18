import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardStatistics, WriterStatisticsService} from "../services/writer-statistics.service";


@Component({
  selector: 'app-writer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './writer-dashboard.component.html',
  styleUrl: './writer-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriterDashboardComponent implements OnInit {
  private statisticsService = inject(WriterStatisticsService);
  private readonly cdr = inject(ChangeDetectorRef);

  stats?: DashboardStatistics;
  loading = true;

  ngOnInit(): void {
    this.statisticsService.getDashboardStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
