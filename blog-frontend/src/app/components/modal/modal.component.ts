import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  @Input() isOpen = false;
  @Input() title = '';
  @Input() text = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
    this.close();
  }

}
