import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit{

  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl("",[Validators.required]),
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
        console.log(data.token);
        console.log(role);
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

              }
              else{

              }
            }
          )
        }
        else{

        }
      }
    )

  }


}
