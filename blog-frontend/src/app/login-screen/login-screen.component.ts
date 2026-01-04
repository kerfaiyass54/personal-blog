import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";
import { Router } from '@angular/router';

import {ToastrService} from "ngx-toastr";
import {SessionsManagementService} from "../shared/services/sessions-management.service";


@Component({
    selector: 'app-login-screen',
  standalone: true,
  imports: [ReactiveFormsModule],
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router, private toastrService: ToastrService,
              private sessionService: SessionsManagementService) {
    this.loginForm = this.fb.group({
      email: new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),});
  }


  ngOnInit(){

  }


  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  signIn() {
    this.submitted = true;
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    let user = {
      email: email,
      password: pass
    }
    this.loginService.login(user).subscribe(
      (res)=>{
        console.log(res);
        this.loginService.setToken(res.token);
        const role = res.role;
        sessionStorage.setItem("role",role);
        this.toastrService.success("WELCOME","Login passed");
        if (role === 'WRITER') {
          this.router.navigate(['/writer'], { replaceUrl: true });
        } else if (role === 'READER') {
          this.router.navigate(['/reader'], { replaceUrl: true });
        } else {
          this.router.navigate(['/', { replaceUrl: true }]);
        }
      },
      ()=>{
        this.verifyUser(user);
      }
    );
  }

  verifyUser(user: any){
    this.loginService.existEmail(user).subscribe(
      (val)=>{
        if(val){
          this.loginService.checkPassword(user).subscribe(
            (v)=>{
              if(!v){
                this.toastrService.error("ERROR","Wrong password");
              }
              else{
                this.toastrService.success("WELCOME","Login passed");
                this.keepSession(user.email);
              }
            }
          )
        }
        else{
          this.toastrService.error("ERROR","Email does not exist");
        }
      }
    );
  }


  keepSession(email:any){
    const ua = navigator.userAgent;

    let browser = 'Unknown';
    let os = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    let session = {
      email: email,
      os: os,
      browser: browser
    }
    this.sessionService.addSession(session).subscribe(
      ()=>{
        console.log("session saved");
      }
    );
  }


}
