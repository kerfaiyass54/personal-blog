import { Routes } from '@angular/router';
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {SignupScreenComponent} from "./signup-screen/signup-screen.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { WriterUiComponent} from './writer-ui/writer-ui.component';
import { ReaderUiComponent} from './reader-ui/reader-ui.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {NoAuthGuard} from "./shared/guards/noAuth.guard";




export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginScreenComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: SignupScreenComponent, canActivate: [NoAuthGuard] },
  {
    path: 'writer',
    canActivate: [AuthGuard],
    data: { roles: ['WRITER'] },
    component: WriterUiComponent
  },
  { path: 'reader', canActivate: [AuthGuard], component: ReaderUiComponent },
  { path: '**', component: ErrorNotFoundComponent }
];
