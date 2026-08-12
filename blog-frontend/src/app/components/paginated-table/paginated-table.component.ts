import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './paginated-table.component.html'
})
export class PaginatedTableComponent {
  @Input({ required: true }) pageNumber!: number;
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) totalRows!: number;
  @Input() pageSize = 5;

  @Output() pageChange = new EventEmitter<number>();

  pages = computed(() =>
    Array.from({ length: this.totalPages }, (_, i) => i + 1)
  );

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  rangeText = computed(() => {
    const start =
      this.pageNumber === 1
        ? 1
        : (this.pageNumber - 1) * this.pageSize + 1;

    const end = Math.min(this.pageNumber * this.pageSize, this.totalRows);

    return `${start}-${end}`;
  });
}
