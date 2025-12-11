import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      // Already logged in → redirect to home
      this.router.navigate(['/'], { replaceUrl: true });
      return false;
    }

    return true; // allow access
  }
}
