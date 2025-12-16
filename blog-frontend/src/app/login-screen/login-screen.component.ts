import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),});
  }


  ngOnInit(){

  }


  get mail(){
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
      (res:any)=>{
        const data = JSON.parse(res);
        this.loginService.setToken(data.token);
        const role = data.role;
        sessionStorage.setItem("role",role);
        if (role === 'WRITER') {
          this.router.navigate(['/writer'], { replaceUrl: true });
        } else if (role === 'READER') {
          this.router.navigate(['/reader'], { replaceUrl: true });
        } else {
          this.router.navigate(['/', { replaceUrl: true }]);
        }
      }
    );


    this.loginService.existEmail(user).subscribe(
      (val)=>{
        if(val){
          this.loginService.checkPassword(user).subscribe(
            (v)=>{
              if(!v){
                console.log("PAssword incorrect");
              }
              else{
                console.log("PAssword correct");
              }
            }
          )
        }
        else{
          console.log("Email does not exist");

        }
      }
    )

  }


}
