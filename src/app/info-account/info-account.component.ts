import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InfoAccountService} from './info-account.service';

@Component({
  selector: 'app-info-account',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './info-account.component.html',
  standalone: true,

  styleUrl: './info-account.component.css'
})
export class InfoAccountComponent implements OnInit{
  pseudo: string | null = '';
  email: string | null = '';
  isUpdating: boolean = false;
  updateForm: FormGroup;
  currentUserId: string | null = '';

  constructor(private infoAccountService: InfoAccountService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Initialisation des valeurs de l'utilisateur depuis le localStorage ou un autre service
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.pseudo = user.pseudo || '';
    this.email = user.email || '';
    this.currentUserId = user.id || ''; // Assurez-vous d'inclure l'ID utilisateur dans le localStorage
  }

  onUpdateClick(): void {
    this.isUpdating = true;
    // Remplir le formulaire avec les données actuelles
    this.updateForm.patchValue({
      pseudo: this.pseudo,
      email: this.email,
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.currentUserId) {
      const userData = {
        pseudo: this.updateForm.value.pseudo, // Remplacez 'username' par 'pseudo'
        email: this.updateForm.value.email,
        password: this.updateForm.value.password
      };




      const userId = Number(this.currentUserId);


      if (isNaN(userId)) {
        console.error('Invalid user ID.');
        return;
      }


      this.infoAccountService.updateUser(userId, userData).subscribe(
        (response) => {
          console.log('Update successful', response);
          // Mettre à jour les informations dans le localStorage
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isUpdating = false;
          window.location.reload();
        },
        (error) => {
          console.error('Error during update', error);
          // Affichage du message d'erreur complet
          console.error('HTTP error:', error.error);
        }
      );
    } else {
      console.log('The form is invalid or the user ID is missing.');
    }
  }


  onCancel(): void {
    this.isUpdating = false;
  }
}
