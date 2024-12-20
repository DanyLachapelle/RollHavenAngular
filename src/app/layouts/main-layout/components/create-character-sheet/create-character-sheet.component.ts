import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class CreateCharacterSheetComponent implements OnInit{
  sheetForm: FormGroup;
  successMessage: string | null = null;
  classes: any[] = [];
  races:any[]=[];
  backgrounds:any[]=[];
  @Output() CharacterCreated = new EventEmitter<unknown>();

  constructor(
    private fb: FormBuilder,
    private sheetService: CharacterService
  ) {
    // Initialiser le formulaire
    this.sheetForm = this.fb.group({
      str: ['', Validators.required],
      dex: ['', Validators.required],
      con: ['', Validators.required],
      int: ['', Validators.required],
      wis: ['', Validators.required],
      cha: ['', Validators.required],
      level: ['', Validators.required],
      name:['', Validators.required],
      race:['', Validators.required],
      class:['', Validators.required],
      bg:['', Validators.required],
      /*
      id: ['', Validators.required],
      idCampaign: ['', Validators.required],
      idPlayer: ['', Validators.required],

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


      subclass:['', Validators.required],
*/
    });
  }

  ngOnInit(): void {
    this.sheetService.getClasses().subscribe({
      next: (data) => {
        this.classes = data.classes;  // Stocke les classes dans la variable
        console.log('Classes fetched:', this.classes);
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
      }
    });


    this.sheetService.getRaces().subscribe({
      next: (data) => {
        this.races = data.races;  // Stocke les races dans la variable
        console.log('Races fetched:', this.races);
      },
      error: (err) => {
        console.error('Error fetching races:', err);
      }
    });

    this.sheetService.getBackgrounds().subscribe({
      next: (data) => {
        this.backgrounds = data.backgrounds;  // Stocke les races dans la variable
        console.log('Races fetched:', this.backgrounds);
      },
      error: (err) => {
        console.error('Error fetching races:', err);
      }
    });
    }

  createCharacter(): void {
    console.log('Button clicked');

    // Vérifier si le formulaire est valide
    if (this.sheetForm.valid) {
      const characterData = this.sheetForm.value;

      // Appel au service pour envoyer les données
      this.sheetService.createCharacter(characterData).subscribe({
        next: (response) => {
          console.log('Character created successfully:', response);
          this.successMessage = 'Character created successfully!';
          this.sheetForm.reset(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Error creating character:', err);
          this.successMessage = 'An error occurred while creating the character.';
        }
      });
    } else {
      // Gestion des erreurs si le formulaire est invalide
      console.error('Invalid form submission:', this.sheetForm.errors);
      for (const control in this.sheetForm.controls) {
        if (this.sheetForm.controls.hasOwnProperty(control)) {
          const field = this.sheetForm.get(control);
          console.log(`Field "${control}" status:`, field?.status, '| Value:', field?.value);
        }
      }
    }
  }

}
