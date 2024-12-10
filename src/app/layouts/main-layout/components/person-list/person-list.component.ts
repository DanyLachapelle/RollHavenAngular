import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-person-list',
  imports: [
    NgForOf
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  people = ['Perso1', 'Perso2', 'Perso3','Perso4', 'Perso5'];
}
