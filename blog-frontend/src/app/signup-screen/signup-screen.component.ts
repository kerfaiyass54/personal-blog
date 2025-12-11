import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../shared/services/login-service.service";


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
              private router: Router) {

    this.signUpForm = this.fb.group({
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required])});

  }


  signup(){

  }



  ngOnInit(){

  }


  get name(){
    return this.signUpForm.get('name');
  }

  get role(){
    return this.signUpForm.get('role');
  }

  get mail(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }








}
