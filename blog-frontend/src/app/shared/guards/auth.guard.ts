import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {LoginServiceService} from "../services/login-service.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getRole();

    if (roles && roles.indexOf(userRole) === -1) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
