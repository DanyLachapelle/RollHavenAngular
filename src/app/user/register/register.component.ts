import {Component, EventEmitter, Output, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../user';
import {NgIf} from '@angular/common';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', [Validators.required])
  });
  constructor(private userService: UserService,private router: Router) {}
  @Output()
  userCreated: EventEmitter<User> = new EventEmitter();

  createAndEmitUser() {
    if (this.form.valid) {
      // Création de l'objet User à partir des données du formulaire
      const newUser: User = {
        id: 0, // L'ID sera généré par le backend
        pseudo: this.form.value.pseudo,
        email: this.form.value.email,
        password: this.form.value.password,
        role: this.form.value.role || 'user',
        isLoggedIn: false,
      };

      // Appel au service pour créer l'utilisateur
      this.userService.create(newUser).subscribe({
        next: (createdUser) => {
          console.log('User successfully created:', createdUser);
          localStorage.setItem('currentUser', JSON.stringify(createdUser));
          alert('User successfully created!');
          this.router.navigate(['/campaign-management']);
          this.form.reset();
        },
        error: (err) => {
          console.error('Error creating user:', err.message);
          alert('An error occurred while creating the user.');
        },
      });
    }
  }
}
