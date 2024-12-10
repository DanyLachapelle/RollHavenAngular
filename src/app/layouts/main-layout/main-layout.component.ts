import { Component } from '@angular/core';
import {CharacterListComponent} from './components/character-list/character-list.component';
import {DisplayAreaComponent} from './components/display-area/display-area.component';
import {PersonListComponent} from './components/person-list/person-list.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CharacterListComponent,
    DisplayAreaComponent,
    PersonListComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  createCharacter() {
    console.log('Création d’un nouveau personnage');
  }
}
