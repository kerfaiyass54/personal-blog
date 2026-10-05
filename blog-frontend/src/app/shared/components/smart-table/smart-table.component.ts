// smart-table.component.ts

import {
  Component, Input, OnInit, OnChanges, SimpleChanges,
  Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SmartTableConfig, StateConfig, TableColumn} from "../models/smart-table";

declare var bootstrap: any;

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartTableComponent<T extends Record<string, any>>
  implements OnInit, OnChanges {

  @Input() config!: SmartTableConfig<T>;
  @Input() data: T[] = [];
  @Output() rowSave = new EventEmitter<T>();  // emits updated row on save

  // ── Pagination ─────────────────────────────────────────
  pageSize = 5;
  currentPage = 1;

  // ── Sort ───────────────────────────────────────────────
  sortKey: keyof T | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  // ── Search ─────────────────────────────────────────────
  searchQuery = '';

  // ── Modal ──────────────────────────────────────────────
  selectedRow: T | null = null;
  editRow: T | null = null;   // mutable copy for editing
  isEditing = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pageSize = this.config.pageSizeOptions?.[0] ?? 5;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.currentPage = 1;
      this.cdr.markForCheck();
    }
  }

  // ── Derived data ────────────────────────────────────────
  get filtered(): T[] {
    if (!this.searchQuery.trim()) return this.data;
    const q = this.searchQuery.toLowerCase();
    return this.data.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q))
    );
  }

  get sorted(): T[] {
    if (!this.sortKey) return this.filtered;
    return [...this.filtered].sort((a, b) => {
      const av = a[this.sortKey!];
      const bv = b[this.sortKey!];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  get paged(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sorted.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ── Sort ────────────────────────────────────────────────
  toggleSort(col: TableColumn<T>) {
    if (!col.sortable) return;
    if (this.sortKey === col.key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = col.key;
      this.sortDir = 'asc';
    }
    this.currentPage = 1;
  }

  // ── Pagination ──────────────────────────────────────────
  goTo(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onPageSizeChange(size: number) {
    this.pageSize = +size;
    this.currentPage = 1;
  }

  // ── Modal ───────────────────────────────────────────────
  openRow(row: T) {
    this.selectedRow = row;
    this.editRow = { ...row };
    this.isEditing = false;
    this.rowSave.emit(row); // 🔥 missing piece

    this.cdr.markForCheck();

  }

  // ── Cell rendering ──────────────────────────────────────
  getCellValue(row: T, col: TableColumn<T>): any {
    return row[col.key];
  }

  getState(value: string, col: TableColumn<T>): StateConfig | undefined {
    return col.states?.find(s => s.value === value);
  }

  getIcon(value: string, col: TableColumn<T>): string {
    return col.iconMap?.[value] ?? value;
  }

  formatDate(value: any, col: TableColumn<T>): string {
    if (!value) return '—';
    const d = new Date(value);
    return d.toLocaleString(undefined, col.dateFormat ?? {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filtered.length);
  }

  truncate(val: string, len = 22): string {
    return val?.length > len ? val.slice(0, len) + '…' : val;
  }

  // ── Export ──────────────────────────────────────────────
  exportCSV() {
    const cols = this.config.columns;
    const header = cols.map(c => c.label).join(',');
    const rows = this.sorted.map(row =>
      cols.map(c => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${this.config.title}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

}
