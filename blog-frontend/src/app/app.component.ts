import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{


  constructor() {
    window.onpopstate = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        history.go(1);
      }
    };
  }

  ngOnInit() {

  }

  title = 'blog-frontend';


}
