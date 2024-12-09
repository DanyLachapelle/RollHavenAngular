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
      // Construct the user object for login (no need for 'pseudo' and 'role' at this stage)
      const loginData = {
        pseudo: this.form.value.pseudo,
        password: this.form.value.password
      };

      // Call the login service method
      this.userService.login(loginData).subscribe({
        next: (response) => {
          console.log('User logged in successfully:', response);
          alert('Login successful!');

          // Optionally store the token in localStorage or sessionStorage
          localStorage.setItem('authToken', response.token);

          // Emit the logged-in user data if needed
          this.userLoggedIn.emit(response);
          this.router.navigate(['/campaign-management']);

          // Reset the form after login
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
