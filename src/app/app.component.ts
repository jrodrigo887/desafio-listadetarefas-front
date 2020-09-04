import { Component } from '@angular/core';

@Component({
  selector: 'app-root',

  template:
  `<div class="container">
    <app-todo class="app-todo"></app-todo>
  </div>`,

  styleUrls: ['./app.component.css']
})

export class AppComponent {
}
