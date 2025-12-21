import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
    window.onpopstate = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        history.go(1);
      }
    };
  }


  title = 'blog-frontend';


}
