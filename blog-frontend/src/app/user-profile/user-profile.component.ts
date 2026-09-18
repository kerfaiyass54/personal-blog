import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileService} from "./service/profile.service";
import {ProfileAddingComponent} from "./profile-adding/profile-adding.component";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {LoginServiceService} from "../shared/services/login-service.service";



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ProfileAddingComponent, ProfileDetailsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit{

  username: any = '';
  hasProfile: boolean = false;
  email: any = '';

  constructor(private profileService: ProfileService, private userService: LoginServiceService) {
  }

  ngOnInit() {
    this.email = sessionStorage.getItem("email");
    this.userService.getUsername(this.email).subscribe(
      (username)=>{
        this.username = username;
        this.profileService.checkUserProfile(this.username).subscribe(
          (val)=>{
            this.hasProfile = val;
          }
        );
      }
    );
  }


}
