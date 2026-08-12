import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardStatistics, WriterStatisticsService} from "../services/writer-statistics.service";


@Component({
  selector: 'app-writer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './writer-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './writer-dashboard.component.scss',
})
export class WriterDashboardComponent implements OnInit {
  private statisticsService = inject(WriterStatisticsService);

  stats?: DashboardStatistics;
  loading = true;

  ngOnInit(): void {
    this.statisticsService.getDashboardStatistics().subscribe({
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
