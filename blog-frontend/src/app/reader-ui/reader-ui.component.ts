import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Component, OnInit, inject} from '@angular/core';
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {CreateSessionRequest, SessionsManagementService} from "../shared/services/sessions-management.service";
import {RouterOutlet, Router, NavigationEnd} from "@angular/router";
import {filter} from "rxjs/operators";
import {LoaderComponent} from "../components/loader/loader.component";

@Component({
  selector: 'app-reader-ui',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    LoaderComponent,
  ],
  templateUrl: './reader-ui.component.html',
  styleUrl: './reader-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReaderUiComponent implements OnInit{

  private readonly cdr = inject(ChangeDetectorRef);

  currentUrl: string = '';
  loading = false;


  constructor(
    private sessionService: SessionsManagementService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.loadPage();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.loadPage();
        this.cdr.markForCheck();
      });

    const email = sessionStorage.getItem("email");
    if (sessionStorage.getItem("sessionId") === null && email) {
      this.keepSession(email);
    }
  }

  keepSession(email: string): void {
    const ua = navigator.userAgent;

    let browser = 'Unknown';
    let os = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    const session: CreateSessionRequest = {
      email: email,
      os: os,
      time: new Date().toISOString(),
      browser: browser,
      alert: 'NOTHING',
      me: true
    }
    this.sessionService.addSession(session).subscribe({
      next: (createdSession) => {
        sessionStorage.setItem('sessionId', createdSession.id);
        this.sessionService.setAlert(createdSession.email, createdSession.time).subscribe({
          next: () => this.cdr.markForCheck(),
          error: () => this.cdr.markForCheck()
        });
      },
      error: () => {
        this.cdr.markForCheck();
      }
    });
  }

  lessons:any[] = [{id: 0, title: 'Check',link: '/reader/check-lessons'},
    {id: 1, title: 'Quiz',link: '/reader/check-quizzes'},{id: 2, title: 'Flashcards',link: '/reader/check-flashcards'}];
  skills:any[] = [{id: 0, title: 'Check',link: 'check-skills'},
    {id: 1, title: 'Keywords',link: 'check-keywords'}];
  articles:any[] = [{id: 0, title: 'Check',link: 'check-articles'},
    {id: 1, title: 'Summaries',link: ''}];

  loadPage(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.cdr.markForCheck();
    }, 280);
  }
}
