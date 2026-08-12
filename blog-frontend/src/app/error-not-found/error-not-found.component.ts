import { Component, ChangeDetectionStrategy } from '@angular/core';
import {ButtonComponent} from "../components/button/button.component";
import { Location } from '@angular/common';


@Component({
    selector: 'app-error-not-found',
    standalone: true,
  imports: [
    ButtonComponent
  ],
    templateUrl: './error-not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './error-not-found.component.scss'
})
export class ErrorNotFoundComponent {

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }

}
