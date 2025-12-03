import { Routes } from '@angular/router';
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {SignupScreenComponent} from "./signup-screen/signup-screen.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: SignupScreenComponent },
  { path: 'home', loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent) },
  {
    path: 'writer',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Writer'] },
    loadComponent: () => import('./writer-ui/writer-ui.component').then(c => c.WriterUiComponent)
  },
  { path: 'reader', canActivate: [AuthGuard], loadComponent: () => import('./reader-ui/reader-ui.component').then(c => c.ReaderUiComponent) },
  { path: '**', redirectTo: 'home' }
];
