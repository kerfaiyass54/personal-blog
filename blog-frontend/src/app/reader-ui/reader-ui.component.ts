import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {SessionsManagementService} from "../shared/services/sessions-management.service";
import {LoginServiceService} from "../shared/services/login-service.service";
import {TableComponent} from "../components/table/table.component";
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-reader-ui',
    standalone: true,
  imports: [
    NavBarComponent,
    TableComponent,
    RouterOutlet,
  ],
    templateUrl: './reader-ui.component.html',
    styleUrl: './reader-ui.component.scss'
})
export class ReaderUiComponent implements OnInit{




  constructor(private sessionService: SessionsManagementService, private loginService: LoginServiceService) {
  }

  ngOnInit() {
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
      browser: browser,
      active: true,
      me: true
    }
    this.sessionService.addSession(session).subscribe(
      (s)=>{
        sessionStorage.setItem('sessionId', s.id);
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


}
