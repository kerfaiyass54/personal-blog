import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginServiceService} from "../services/login-service.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private login: LoginServiceService, private router: Router) {}

  canActivate() {
    if (this.login.isLogged()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
