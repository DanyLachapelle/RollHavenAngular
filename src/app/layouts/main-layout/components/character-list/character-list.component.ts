import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [
    NgForOf
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters = [
    { id: 1, name: 'Personnage 1' },
    { id: 2, name: 'Personnage 2' },
    { id: 3, name: 'Personnage 3' }
  ];

  selectCharacter(character: any) {
    // Logique pour mettre à jour la zone d'affichage centrale
    console.log('Personnage sélectionné :', character);
  }
}
