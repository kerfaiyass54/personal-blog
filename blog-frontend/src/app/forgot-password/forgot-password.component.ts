import { Component, ChangeDetectionStrategy } from '@angular/core';
import {InserCodeComponent} from "./inser-code/inser-code.component";
import {InserPassComponent} from "./inser-pass/inser-pass.component";

@Component({
  selector: 'app-forgot-password',
  imports: [
    InserCodeComponent,
    InserPassComponent
  ],
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {

  codeCorrect = false;

  goToPasswordSetting(e: boolean){
    this.codeCorrect = e;
  }

}
