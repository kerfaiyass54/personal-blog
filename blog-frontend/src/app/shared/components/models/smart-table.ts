// smart-table.model.ts

export type ColumnType = 'text' | 'icon' | 'state' | 'date' | 'badge' | 'svg';

export interface StateConfig {
  value: string;
  label?: string;
  color: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  icon?: string; // emoji or svg string
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  type: ColumnType;
  sortable?: boolean;
  width?: string;
  // For type='state'
  states?: StateConfig[];
  // For type='icon' — map value to emoji/svg
  iconMap?: Record<string, string>;
  // For type='date'
  dateFormat?: Intl.DateTimeFormatOptions;
  // Custom cell renderer (optional override)
  render?: (value: any, row: T) => string;
}

export interface ModalField<T = any> {
  key: keyof T;
  label: string;
  type: ColumnType;
  states?: StateConfig[];
  iconMap?: Record<string, string>;
  editable?: boolean;          // show an input in edit mode
  inputType?: 'text' | 'select' | 'date' | 'textarea';
  selectOptions?: { value: string; label: string }[];
}

export interface SmartTableConfig<T = any> {
  title: string;
  columns: TableColumn<T>[];
  modalFields?: ModalField<T>[];  // fields shown in the detail modal
  pageSizeOptions?: number[];
  exportable?: boolean;
  searchable?: boolean;
  modalTitle?: (row: T) => string;
}
