import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
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
export class InserCodeComponent implements OnInit{

  codeSent = false;
  submitted = false;
  codeVerified = false;
  link: any = '';
  email: any = '';
  @Output() verified = new EventEmitter<boolean>();

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,private toastr: ToastrService,
    private resetService: ResetPassService
  ) {}


  ngOnInit() {

    if(sessionStorage.getItem("email") !== null){
      let role = sessionStorage.getItem("role")?.toLowerCase();
      let id = localStorage.getItem("sessionID");
      this.link = '/' + role + '/session-details/' + id;
    }
    else{
      this.link = '/login';
    }

  }

  verifyCode() {
    this.submitted = true;
    if (this.form.invalid) return;
    else{

      this.resetService.setCode(this.form.value.code,this.email).subscribe(
        (val)=>{
          if(val){
            this.codeVerified = true;
            this.verified.emit(this.codeVerified);
          }
        }
      );
    }
  }

  sendCode(){
    this.codeSent = true;
    this.toastr.success("Code sent", "SUCCESS");
    this.email = this.form.value.email;
    this.resetService.sendEmail(this.form.value.email).subscribe(
      ()=>{
        this.codeSent = true;
        this.toastr.success("Code sent", "SUCCESS");
      }
    );
  }

}
