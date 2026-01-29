import { Component } from '@angular/core';
import {InformationCardComponent} from "../components/information-card/information-card.component";

@Component({
  selector: 'app-session-details',
  imports: [
    InformationCardComponent
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent {

}
