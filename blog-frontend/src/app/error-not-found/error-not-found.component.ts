import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import {ButtonComponent} from "../components/button/button.component";
import { Location } from '@angular/common';


@Component({
    selector: 'app-error-not-found',
    standalone: true,
  imports: [
    ButtonComponent
  ],
    templateUrl: './error-not-found.component.html',
    styleUrl: './error-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorNotFoundComponent {

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }

}
