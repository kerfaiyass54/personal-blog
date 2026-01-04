import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {ResetPassService} from "../service/reset-pass.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-inser-code',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inser-code.component.html',
  styleUrl: './inser-code.component.scss',
})
export class InserCodeComponent {

  codeSent = false;
  submitted = false;
  codeVerified = false;
  @Output() verified = new EventEmitter<boolean>();

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,private toastr: ToastrService,
    private resetService: ResetPassService
  ) {}


  verifyCode() {
    this.submitted = true;
    if (this.form.invalid) return;
  }

  sendCode(){
    this.resetService.sendEmail(this.form.value.email).subscribe(
      ()=>{
        this.codeSent = true;
        this.toastr.success("Code sent", "SUCCESS");
      }
    );
  }

}
