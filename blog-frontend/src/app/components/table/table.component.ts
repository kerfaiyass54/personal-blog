import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() title = '';
  @Input() columns: string[] = [];
  @Input() data: string[][] = [];

  pageSize = 5;
  page = 1;

  private dragSrc: HTMLTableCellElement | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get pagedData(): string[][] {
    const start = (this.page - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  next() {
    if (this.page < this.totalPages) this.page++;
  }

  prev() {
    if (this.page > 1) this.page--;
  }

  ngAfterViewInit(): void {
    const thead = this.el.nativeElement.querySelector(
      'thead'
    ) as HTMLTableSectionElement;
    const tbody = this.el.nativeElement.querySelector(
      'tbody'
    ) as HTMLTableSectionElement;

    if (!thead || !tbody) return;

    const headers = Array.from(
      thead.rows[0].cells
    ) as HTMLTableCellElement[];

    headers.forEach((th) => {
      th.addEventListener('dragstart', (e: DragEvent) => {
        this.dragSrc = th;
        th.classList.add('drag');
        e.dataTransfer?.setData('text/plain', th.cellIndex.toString());
      });

      th.addEventListener('dragover', (e) => e.preventDefault());
      th.addEventListener('dragenter', () => th.classList.add('over'));
      th.addEventListener('dragleave', () => th.classList.remove('over'));

      th.addEventListener('dragend', () => {
        th.classList.remove('drag');
        headers.forEach(h => h.classList.remove('over'));
      });

      th.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        if (!this.dragSrc || this.dragSrc === th) return;

        const from = Number(e.dataTransfer?.getData('text/plain'));
        const to = th.cellIndex;
        const pos = to > from ? 'afterend' : 'beforebegin';

        headers[to].insertAdjacentElement(pos, headers[from]);

        Array.from(tbody.rows).forEach((row: HTMLTableRowElement) => {
          row.cells[to].insertAdjacentElement(pos, row.cells[from]);
        });
      });
    });
  }
}
