import { Component } from '@angular/core';

@Component({
    selector: 'app-writer-ui',
    standalone: true,
imports: [],
    templateUrl: './writer-ui.component.html',
    styleUrl: './writer-ui.component.scss'
})
export class WriterUiComponent {

  lessons:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Add',link: ''}];
  skills:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Add',link: ''}];
  articles:any[] = [{id: 0, title: 'Check',link: ''},
    {id: 1, title: 'Summaries',link: ''},
    {id: 2, title: 'Plans',link: ''}];

}
