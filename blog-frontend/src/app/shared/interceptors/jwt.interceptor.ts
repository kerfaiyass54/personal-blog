
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import {LoginServiceService} from "../services/login-service.service";
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  const authService = inject(LoginServiceService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
