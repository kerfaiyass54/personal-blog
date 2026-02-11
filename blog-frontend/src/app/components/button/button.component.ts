import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-button',
  imports: [
    RouterLink
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() link: string | any[] = '';
  @Input() color: string = '#00a1b7'; // default color

}
