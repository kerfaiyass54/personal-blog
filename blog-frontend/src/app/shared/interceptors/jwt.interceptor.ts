import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: LoginServiceService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          console.log("401 detected → logging out");

          this.authService.logout();
          this.router.navigate(['/login'], { replaceUrl: true });
        }

        return throwError(() => error);
      })
    );
  }
}
