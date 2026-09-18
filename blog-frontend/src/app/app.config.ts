import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },provideHttpClient(),provideToastr(),provideAnimations()]
};
