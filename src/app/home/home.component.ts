import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  onLogin() {
      this.router.navigate(['/campaign-management']);
    }
}
