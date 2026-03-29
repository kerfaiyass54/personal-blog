import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginServiceService} from "../../shared/services/login-service.service";
import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../loader/loader.component";



@Component({
    selector: 'app-nav-bar',
    standalone: true,
  imports: [RouterLink, LoaderComponent],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  constructor(private loginService: LoginServiceService, private route: Router, private toastrService: ToastrService) {
  }

  @Input() articles: any[] = [];
  @Input() skill: any[] = [];
  @Input() lesson: any[] = [];
  @Input() role: string = '';
  id: any = '';
  loading = true;



  ngOnInit() {
    this.loadPage();
  }

  logout(){
    this.id = sessionStorage.getItem('sessionId');
    this.loginService.logout();
    this.route.navigate(['/login']);
    window.location.reload();
    sessionStorage.clear();
    this.toastrService.success("LOGOUT","You're out now!");
  }

  loadPage(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }


}
