import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-information-card',
  imports: [],
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.scss',
})
export class InformationCardComponent {

  @Input() title:any;
  @Input() value:any;
  @Input() color:any;

}
