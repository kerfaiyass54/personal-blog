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

  lessons:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Explainings',link: ''},
    {id: 2, title: 'Quiz',link: ''}];
  skills:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Keywords',link: ''}];
  articles:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Summaries',link: ''}];



}
