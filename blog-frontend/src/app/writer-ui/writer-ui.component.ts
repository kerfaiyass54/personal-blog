import {Component, OnInit} from '@angular/core';
import {SessionsManagementService} from "../shared/services/sessions-management.service";
import {LoginServiceService} from "../shared/services/login-service.service";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {TableComponent} from "../components/table/table.component";

@Component({
    selector: 'app-writer-ui',
    standalone: true,
  imports: [
    NavBarComponent
  ],
    templateUrl: './writer-ui.component.html',
    styleUrl: './writer-ui.component.scss'
})
export class WriterUiComponent implements OnInit{



  constructor(private sessionService: SessionsManagementService, private loginService: LoginServiceService) {
  }

  ngOnInit() {
    if((sessionStorage.getItem("sessionId") == null) ){
      this.keepSession(sessionStorage.getItem("email"));
    }
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
      browser: browser,
      active: true,
      me: true
    }
    this.sessionService.addSession(session).subscribe(
      (s)=>{
        sessionStorage.setItem('sessionId', s.id);
        this.sessionService.setAlert(s.id,s.email).subscribe(
          ()=>{});
      }
    );
  }
}
