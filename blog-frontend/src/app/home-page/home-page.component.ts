import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../shared/services/login-service.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
imports: [],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  role: any;

  constructor(private authService: LoginServiceService, private router: Router) {}

  ngOnInit(){

    this.role = sessionStorage.getItem("role");
    if (this.role === 'WRITER') {
      this.router.navigate(['/writer'], { replaceUrl: true });
    } else if (this.role === 'READER') {
      this.router.navigate(['/reader'], { replaceUrl: true });
    } else {
      this.router.navigate(['/', { replaceUrl: true }]);
    }

  }



}
