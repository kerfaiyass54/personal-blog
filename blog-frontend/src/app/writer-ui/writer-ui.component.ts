import {Component, OnInit} from '@angular/core';
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
    styleUrl: './writer-ui.component.scss'
})
export class WriterUiComponent implements OnInit{


  loading = false;
  currentUrl: string = '';



  constructor(private sessionService: SessionsManagementService,private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.loadPage();      });
    if((sessionStorage.getItem("sessionId") == null) ){
      this.keepSession(sessionStorage.getItem("email"));
    }
  }

  loadPage(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  lessons:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Add',link: ''}];
  skills:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Add',link: ''}];
  articles:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Summaries',link: ''},
    {id: 2, title: 'Plans',link: ''}];

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
