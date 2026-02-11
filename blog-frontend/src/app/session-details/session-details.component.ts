import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionsManagementService} from "../shared/services/sessions-management.service";
import {InformationCardComponent} from "../components/information-card/information-card.component";
import {ButtonComponent} from "../components/button/button.component";

@Component({
  selector: 'app-session-details',
  imports: [
    InformationCardComponent,
    ButtonComponent

  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit{

  role: any = '';
  id: any = '';
  browser: any = {title: 'Browser', value: ''};
  os: any = {title: 'OS', value: ''};
  time: any = '';
  isMe: any = false;
  alert: any = '';

  constructor(private activeRouter: ActivatedRoute, private sessionsService: SessionsManagementService) {
  }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    localStorage.setItem("sessionID",this.id);
    this.role = sessionStorage.getItem("role")?.toLowerCase();
    this.sessionsService.getSession(this.id).subscribe(
      (session)=>{
        console.log(session);
        this.browser.value = session.browser;
        this.os.value = session.os;
        this.time = session.time;
        this.alert = session.alert;
        this.isMe = session.me;
      }
    )
  }


  protected readonly length = length;
}
