import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LoginServiceService } from '../shared/services/login-service.service';
import { ToastrService } from 'ngx-toastr';

interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email:    new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get email()    { return this.loginForm.get('email');    }
  get password() { return this.loginForm.get('password'); }

  signIn(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const user = {
      email:    this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.login(user).subscribe({
      next: (res) => {
        // Save token
        this.loginService.setToken(res.token);

        // Decode JWT to extract username from 'sub'
        const decoded = jwtDecode<JwtPayload>(res.token);
        const username = decoded.sub;

        // Persist session data
        sessionStorage.setItem('role',     res.role);
        sessionStorage.setItem('email',    user.email);

        this.toastrService.success('WELCOME', 'Login passed');

        // Navigate by role
        if (res.role === 'WRITER') {
          this.router.navigate(['/writer'], { replaceUrl: true });
        } else if (res.role === 'READER') {
          this.router.navigate(['/reader'], { replaceUrl: true });
        } else {
          this.router.navigate(['/'], { replaceUrl: true });
        }
      },
      error: () => {
        this.verifyUser(user);
      },
    });
  }

  private verifyUser(user: { email: string; password: string }): void {
    this.loginService.existEmail(user.email).subscribe((emailExists) => {
      if (!emailExists) {
        this.toastrService.error('Email does not exist', 'ERROR');
        return;
      }

      this.loginService.checkPassword(user.email, user.password).subscribe((passwordValid) => {
        if (!passwordValid) {
          this.toastrService.error('Wrong password', 'ERROR');
        } else {
          this.toastrService.success('Login passed', 'WELCOME');
        }
      });
    });
  }
}
