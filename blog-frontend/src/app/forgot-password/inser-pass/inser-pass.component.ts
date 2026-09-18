import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginServiceService} from "../../shared/services/login-service.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-inser-pass',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inser-pass.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './inser-pass.component.scss',
})
export class InserPassComponent {

  constructor(private fb: FormBuilder,
    private loginService: LoginServiceService, private route: Router) {}

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required], confirm: ['', Validators.required]
  });

  setPassword(){
    if(this.form.value.password == this.form.value.confirm){
      this.loginService.changePassword(this.form.value.email,this.form.value.password).subscribe(
        ()=>{
          this.route.navigate(['/login']);
        }
      );
    }
    else{
    }
  }






}
