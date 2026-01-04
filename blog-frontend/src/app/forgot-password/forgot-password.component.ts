import { Component } from '@angular/core';
import {InserCodeComponent} from "./inser-code/inser-code.component";

@Component({
  selector: 'app-forgot-password',
  imports: [
    InserCodeComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {

  codeCorrect = false;

  goToPasswordSetting(e: boolean){
    this.codeCorrect = e;
  }

}
