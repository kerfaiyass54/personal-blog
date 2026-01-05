import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginServiceService} from "../../shared/services/login-service.service";



@Component({
    selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private loginService: LoginServiceService, private route: Router) {
  }

  @Input() articles: any[] = [];
  @Input() skill: any[] = [];
  @Input() lesson: any[] = [];

  logout(){
    sessionStorage.clear();
    this.loginService.logout();
    this.route.navigate(['/login']);
  }


}
