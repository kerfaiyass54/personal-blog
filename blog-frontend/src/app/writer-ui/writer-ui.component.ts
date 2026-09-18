import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Component, OnInit, inject} from '@angular/core';
import {SessionsManagementService} from "../shared/services/sessions-management.service";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {LoaderComponent} from "../components/loader/loader.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-writer-ui',
    standalone: true,
  imports: [
    NavBarComponent,
    LoaderComponent,
    RouterOutlet
  ],
    templateUrl: './writer-ui.component.html',
    styleUrl: './writer-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriterUiComponent implements OnInit{

  private readonly cdr = inject(ChangeDetectorRef);


  loading = false;
  currentUrl: string = '';



  constructor(private sessionService: SessionsManagementService,private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.loadPage();
        this.cdr.markForCheck();
      });
    if((sessionStorage.getItem("sessionId") == null) ){
      this.keepSession(sessionStorage.getItem("email"));
    }
  }

  loadPage(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.cdr.markForCheck();
    }, 500);
  }

  lessons:any[] = [{id: 0, title: 'Check',link: '/writer/check-lessons'},
    {id: 1, title: 'Add',link: '/writer/add-lessons'},{id: 2, title: 'Flashcards',link: '/writer/check-flashcards'}];
  skills:any[] = [{id: 0, title: 'Check',link: '/writer/check-skills'},
    {id: 1, title: 'Add',link: '/writer/add-skills'}];
  articles:any[] = [{id: 0, title: 'Check',link: '/writer/list-articles'},
    {id: 1, title: 'Plans',link: '/writer/check-plans'}];

  keepSession(email:any){
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

    let session = {
      email: email,
      os: os,
      time: new Date().toISOString(),
      browser: browser,
      alert: 'NOTHING',
      me: true
    }
    this.sessionService.addSession(session).subscribe(
      (s)=>{
        sessionStorage.setItem('sessionId', s.id);
        this.sessionService.setAlert(s.email,s.time).subscribe(
          ()=>{});
      }
    );
  }
}
