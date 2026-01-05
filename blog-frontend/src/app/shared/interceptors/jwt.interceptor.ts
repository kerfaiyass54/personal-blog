// src/app/services/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {LoginServiceService} from "../services/login-service.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: LoginServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.authService.getToken();
    if (req.url.includes('/sessions/')) {
      return next.handle(req);
    }
    if (token) {
      if (req.url.includes('/sessions/')) {
        return next.handle(req);
      }
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
