import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionDetails, SessionsManagementService} from "../shared/services/sessions-management.service";
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDetailsComponent implements OnInit{

  role: string | undefined;
  id: any = '';
  browser: any = {title: 'Browser', value: ''};
  os: any = {title: 'OS', value: ''};
  time: any = '';
  isMe: boolean = false;
  alert: string = '';
  loading = true;
  loadError = '';

  constructor(
    private activeRouter: ActivatedRoute,
    private sessionsService: SessionsManagementService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    localStorage.setItem("sessionID",this.id);
    this.role = sessionStorage.getItem("role")?.toLowerCase();
    if (!this.id) {
      this.loadError = 'The requested session was not found.';
      this.loading = false;
      return;
    }

    this.sessionsService.getSession(this.id).subscribe({
      next: (session: SessionDetails) => {
        this.browser.value = session.browser;
        this.os.value = session.os;
        this.time = new Date(session.time).toLocaleString();
        this.alert = session.alert;
        this.isMe = session.me;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Unable to load this login session.';
        this.cdr.markForCheck();
      }
    });
  }

  notMe(){
    this.sessionsService.setIsItMe(this.id,false).subscribe(
      ()=>{
        this.router.navigate(['/' + this.role + '/password']);
      }
    );
  }


  protected readonly length = length;
}
