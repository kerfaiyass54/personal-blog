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
import {RecommendationService} from "./user-playlists/service/recommendation-service.service";
import {RecommandationsPageComponent} from "./user-playlists/recommandations-page/recommandations-page.component";
import {CheckSkillsComponent} from "./writer-ui/check-skills/check-skills.component";
import {AddSkillsComponent} from "./writer-ui/add-skills/add-skills.component";
import {ListSkillsComponent} from "./writer-ui/list-skills/list-skills.component";
import {SkillRecommandationComponent} from "./writer-ui/skill-recommandation/skill-recommandation.component";
import {CheckKeywordsComponent} from "./reader-ui/check-keywords/check-keywords.component";
import {CheckRecommendedComponent} from "./reader-ui/check-recommended/check-recommended.component";
import {CheckSkillsReaderComponent} from "./reader-ui/check-skills-reader/check-skills-reader.component";
import {CheckArticlesComponent} from "./writer-ui/check-articles/check-articles.component";
import {AddArticleComponent} from "./writer-ui/add-article/add-article.component";
import {UpdateArticleComponent} from "./writer-ui/update-article/update-article.component";
import {ReadArticleComponent} from "./writer-ui/read-article/read-article.component";
import {SavedArticlesComponent} from "./reader-ui/saved-articles/saved-articles.component";
import {ReadingArticleComponent} from "./reader-ui/reading-article/reading-article.component";
import {CheckingArticlesComponent} from "./reader-ui/checking-articles/checking-articles.component";
import {PlanCheckingComponent} from "./writer-ui/plan-checking/plan-checking.component";
import {PlanGenerateComponent} from "./writer-ui/plan-generate/plan-generate.component";
import {AddLessonsComponent} from "./writer-ui/add-lessons/add-lessons.component";
import {LessonDetailsComponent} from "./writer-ui/lesson-details/lesson-details.component";
import {CheckLessonsToReadComponent} from "./reader-ui/check-lessons-to-read/check-lessons-to-read.component";
import {ReadLessonComponent} from "./reader-ui/read-lesson/read-lesson.component";
import {CheckLessonsComponent} from "./writer-ui/check-lessons/check-lessons.component";
import {CheckFlashcardsComponent} from "./writer-ui/check-flashcards/check-flashcards.component";




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
      },
      {
        path: 'music-recommend',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: RecommandationsPageComponent
      },
      {
        path: 'check-skills',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: CheckSkillsComponent
      },
      {
        path: 'add-skills',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: AddSkillsComponent
      },{
        path: 'list-skills',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: ListSkillsComponent
      },{
        path: 'recommend-skills',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: SkillRecommandationComponent
      },{
        path: 'list-articles',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: CheckArticlesComponent
      },{
        path: 'add-article',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: AddArticleComponent
      },{
        path: 'update-article/:id',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: UpdateArticleComponent
      },{
        path: 'read-article/:id',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: ReadArticleComponent
      },{
        path: 'check-plans',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: PlanCheckingComponent
      },{
        path: 'generate-plan',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: PlanGenerateComponent
      },{
        path: 'check-lessons',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: CheckLessonsComponent
      },{
        path: 'check-flashcards',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: CheckFlashcardsComponent
      },{
        path: 'add-lessons',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: AddLessonsComponent
      },{
        path: 'lesson-details/:id',
        canActivate: [AuthGuard],
        data: { roles: ['WRITER']},
        component: LessonDetailsComponent
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
        data: { roles: ['READER']},
        component: DashPlaylistComponent
      },
      {
        path: 'check-skills',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckSkillsReaderComponent
      },
      {
        path: 'check-keywords',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckKeywordsComponent
      },
      {
        path: 'check-recommended',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckRecommendedComponent
      },
      {
        path: 'check-articles',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckingArticlesComponent
      },
      {
        path: 'saved-articles',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: SavedArticlesComponent
      },{
        path: 'read-article/:id',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: ReadingArticleComponent
      },
      {
        path: 'check-lessons',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckLessonsToReadComponent
      },{
        path: 'read-lesson/:id',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: ReadLessonComponent
      },{
        path: 'check-flashcards',
        canActivate: [AuthGuard],
        data: { roles: ['READER']},
        component: CheckFlashcardsComponent
      }


    ]},
  { path: '**', component: ErrorNotFoundComponent }
];
