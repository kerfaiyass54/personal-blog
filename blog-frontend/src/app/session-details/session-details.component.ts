import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionsManagementService} from "../shared/services/sessions-management.service";

@Component({
  selector: 'app-session-details',
  imports: [

  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit{

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



}
