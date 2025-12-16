import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-signup-screen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss'
})
export class SignupScreenComponent implements OnInit{

  signUpForm: FormGroup;


  constructor(private fb: FormBuilder,
              private loginService: LoginServiceService,
              private router: Router, private toastrService: ToastrService) {

    this.signUpForm = this.fb.group({
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),
      confirm: new FormControl("",[Validators.required])});
  }


  signup(){
    let item = this.signUpForm.value;
    if(item.password == item.confirm){
      let user = {
        name: item.name,
        password: item.password,
        email: item.email
      }
      this.loginService.existEmail(user).subscribe(
        (val)=>{
          if(val){
            this.toastrService.error("ERROR","This email already exists!");
          }
          else{
            this.loginService.register(user).subscribe(
              ()=>{
                this.toastrService.success("SUCCESS","Account saved!");
              }
            )
          }
        }
      )
    }
    else{
      this.toastrService.error("ERROR","This email already exists!");

    }
  }



  ngOnInit(){

  }


  get name(){
    return this.signUpForm.get('name');
  }

  get confirm(){
    return this.signUpForm.get('confirm');
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }








}
