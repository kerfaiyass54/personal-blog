import { Component } from '@angular/core';
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-reader-ui',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './reader-ui.component.html',
  styleUrl: './reader-ui.component.scss'
})
export class ReaderUiComponent {

}
