import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {CharacterService} from './character.service';

@Component({
  selector: 'app-create-character-sheet',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './create-character-sheet.component.html',
  standalone: true,
  styleUrl: './create-character-sheet.component.css'
})
export class CreateCharacterSheetComponent {
  sheetForm: FormGroup;
  successMessage: string | null = null;
  @Output() CharacterCreated = new EventEmitter<unknown>();

  constructor(
    private fb: FormBuilder,
    private sheetService: CharacterService
  ) {
    // Initialiser le formulaire
    this.sheetForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      accessibility: ['', Validators.required]
    });
  }

  createCharacter() {
    if (this.sheetForm.valid) {
      const characterData = this.sheetForm.value;

      // Appel au service pour créer une campagne
      // @ts-ignore
      this.sheetService.createCharacter().subscribe({
        next: (response) => {
          console.log('Character created successfully:', response);
          this.successMessage = 'Character created successfully!';
          this.sheetForm.reset(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Error creating Character:', err);
          this.successMessage = 'An error occurred while creating the Character.';
        }
      });
    }
  }
}
