import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginServiceService} from "../../shared/services/login-service.service";
import {SessionsManagementService} from "../../shared/services/sessions-management.service";
import {ToastrService} from "ngx-toastr";



@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private loginService: LoginServiceService, private route: Router, private sessionService: SessionsManagementService, private toastrService: ToastrService) {
  }

  @Input() articles: any[] = [];
  @Input() skill: any[] = [];
  @Input() lesson: any[] = [];
  @Input() role: any = '';
  id: any = '';



  logout(){
    this.id = sessionStorage.getItem('sessionId');
    this.loginService.logout();
    this.route.navigate(['/login']);
    window.location.reload();
    sessionStorage.clear();
    this.toastrService.success("LOGOUT","You're out now!");
  }


}
