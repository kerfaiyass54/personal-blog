import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {SessionsManagementService} from "../shared/services/sessions-management.service";
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
  styleUrl: './reader-ui.component.scss'
})
export class ReaderUiComponent implements OnInit{

  currentUrl: string = '';
  loading = false;


  constructor(
    private sessionService: SessionsManagementService,
    private router: Router
  ) {
  }

  ngOnInit() {

    // URL change listener
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
this.loadPage();      });

    if((sessionStorage.getItem("sessionId") == null) ){
      this.keepSession(sessionStorage.getItem("email"));
    }
  }

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

  lessons:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Explainings',link: ''},
    {id: 2, title: 'Quiz',link: ''}];
  skills:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Keywords',link: ''}];
  articles:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Summaries',link: ''}];

  loadPage(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
