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
      id: ['', Validators.required],
      idCampaign: ['', Validators.required],
      strength: ['', Validators.required],
      dexterity: ['', Validators.required],
      constitution: ['', Validators.required],
      intelligence: ['', Validators.required],
      wisdom: ['', Validators.required],
      charisma: ['', Validators.required],
      level: ['', Validators.required],
      xp: ['', Validators.required],
      proficiency: ['', Validators.required],
      ac : ['', Validators.required],
      hitPointsMax: ['', Validators.required],
      hitPointsCurrent: ['', Validators.required],
      hitPointsTemp: ['', Validators.required],
      hitDiceMax: ['', Validators.required],
      hitDiceCurrent: ['', Validators.required],
      deathSaveSuccess: ['', Validators.required],
      deathSaveFailed: ['', Validators.required],
      initiative: ['', Validators.required],
      speed: ['', Validators.required],
      passivePerception: ['', Validators.required],
      athletics:['', Validators.required],
      acrobatics:['', Validators.required],
      sleightOfHand:['', Validators.required],
      stealth:['', Validators.required],
      arcana:['', Validators.required],
      history:['', Validators.required],
      investigation:['', Validators.required],
      nature:['', Validators.required],
      religion:['', Validators.required],
      animalHandling:['', Validators.required],
      insight:['', Validators.required],
      medicine:['', Validators.required],
      perception:['', Validators.required],
      survival:['', Validators.required],
      deception:['', Validators.required],
      intimidation:['', Validators.required],
      performance:['', Validators.required],
      persuasion:['', Validators.required],
      heroicInspiration:['', Validators.required],
      armorTraining:['', Validators.required],
      size:['', Validators.required],
      name:['', Validators.required],
      race:['', Validators.required],
      class:['', Validators.required],
      subclass:['', Validators.required],
      background:['', Validators.required],
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
