import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-router-outlet',
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class RouterOutletComponent {

}
