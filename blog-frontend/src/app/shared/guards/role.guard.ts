import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {LoginServiceService} from "../services/login-service.service";


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private login: LoginServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const roles = this.login.getRoles();
    if (requiredRoles.some(r => roles.includes(r))) return true;
    this.router.navigate(['/reader']);
    return false;
  }
}
