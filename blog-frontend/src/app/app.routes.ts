import { Routes } from '@angular/router';
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {SignupScreenComponent} from "./signup-screen/signup-screen.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { WriterUiComponent} from './writer-ui/writer-ui.component';
import { ReaderUiComponent} from './reader-ui/reader-ui.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {NoAuthGuard} from "./shared/guards/noAuth.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginHistoryComponent} from "./login-history/login-history.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {SessionDetailsComponent} from "./session-details/session-details.component";




export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginScreenComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: SignupScreenComponent, canActivate: [NoAuthGuard] },
  { path: 'password', component: ForgotPasswordComponent, canActivate: [NoAuthGuard] },
  {
    path: 'writer',
    canActivate: [AuthGuard],
    data: { roles: ['WRITER'] },
    component: WriterUiComponent,
    children: [
      {
        path: 'user-history',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: LoginHistoryComponent
      },
      {
        path: 'user-details',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: UserDetailsComponent
      },
      {
        path: 'session-details/:id',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: SessionDetailsComponent
      },
      {
        path: 'password',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: ForgotPasswordComponent
      }
    ]
  },
  { path: 'reader', canActivate: [AuthGuard], component: ReaderUiComponent,
    children: [
      {
        path: 'user-history',
        canActivate: [AuthGuard],
        component: LoginHistoryComponent
      },
      {
        path: 'user-details',
        canActivate: [AuthGuard],
        component: UserDetailsComponent
      },
      {
        path: 'session-details/:id',
        canActivate: [AuthGuard],
        data: { roles: ['READER'] },
        component: SessionDetailsComponent
      },
      {
        path: 'password',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: ForgotPasswordComponent
      }
    ]},
  { path: '**', component: ErrorNotFoundComponent }
];
