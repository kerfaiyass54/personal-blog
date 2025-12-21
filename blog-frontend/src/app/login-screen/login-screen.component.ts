import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import {ToastrService} from "ngx-toastr";


@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router, private toastrService: ToastrService) {
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


}
