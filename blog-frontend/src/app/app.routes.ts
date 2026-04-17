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
import {SessionDetailsComponent} from "./session-details/session-details.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserSocialMediaComponent} from "./user-social-media/user-social-media.component";
import {UserPlaylistsComponent} from "./user-playlists/user-playlists.component";
import {AddSoundtrackComponent} from "./user-playlists/add-soundtrack/add-soundtrack.component";
import {AddPlaylistComponent} from "./user-playlists/add-playlist/add-playlist.component";
import {DashMusicComponent} from "./user-playlists/dash-music/dash-music.component";
import {DashPlaylistComponent} from "./user-playlists/dash-playlist/dash-playlist.component";




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
        path: 'session-details/:id',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: SessionDetailsComponent
      },{
        path: 'add-music',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: AddSoundtrackComponent
      },
      {
        path: 'add-playlist',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER'] },
        component: AddPlaylistComponent
      },
      {
        path: 'password',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: ForgotPasswordComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: UserProfileComponent
      },
      {
        path: 'social',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: UserSocialMediaComponent
      },
      {
        path: 'playlists',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: UserPlaylistsComponent
      },
      {
        path: 'add-soundtrack',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: AddSoundtrackComponent
      },
      {
        path: 'add-playlist',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: AddPlaylistComponent
      },
      {
        path: 'dash-playlist',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: DashPlaylistComponent
      },
      {
        path: 'dash-music',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: DashMusicComponent
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
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: UserProfileComponent
      },
      {
        path: 'social',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: UserSocialMediaComponent
      },
      {
        path: 'playlists',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: UserPlaylistsComponent
      },
      {
        path: 'dash-music',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: DashMusicComponent
      },{
        path: 'add-music',
        canActivate: [AuthGuard],
        data: { roles: ['READER'] },
        component: AddSoundtrackComponent
      },
      {
        path: 'add-playlist',
        canActivate: [AuthGuard],
        data: { roles: ['READER'] },
        component: AddPlaylistComponent
      },
      {
        path: 'dash-playlist',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: DashPlaylistComponent
      }

    ]},
  { path: '**', component: ErrorNotFoundComponent }
];
