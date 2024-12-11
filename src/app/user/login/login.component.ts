import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,private router: Router) {}

  @Output()
  userLoggedIn: EventEmitter<any> = new EventEmitter();

  loginUser() {
    if (this.form.valid) {
      const loginData = {
        pseudo: this.form.value.pseudo,
        password: this.form.value.password
      };

      this.userService.login(loginData).subscribe({
        next: (response) => {
          console.log('User logged in successfully:', response);
          alert('Login successful!');

          // Stockage du token et des informations utilisateur dans le localStorage
          localStorage.setItem('authToken', response.token);

          // Stocker l'utilisateur sous la clé 'currentUser'
          localStorage.setItem('currentUser', JSON.stringify({
            id: response.id,
            pseudo: response.pseudo,
            email: response.email,
            role: response.role,
            isLoggedIn: response.isLoggedIn
          }));

          // Émettre l'utilisateur connecté si nécessaire
          this.userLoggedIn.emit(response);
          this.router.navigate(['/campaign-management']);

          // Réinitialiser le formulaire après la connexion
          this.form.reset();
        },
        error: (err) => {
          console.error('Error logging in user:', err.message);
          alert('An error occurred while logging in.');
        },
      });
    } else {
      alert('The form is invalid. Please check your credentials.');
    }
  }


}
