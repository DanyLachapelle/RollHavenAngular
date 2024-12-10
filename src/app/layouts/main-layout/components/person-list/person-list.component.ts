import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-person-list',
  imports: [
    NgForOf
  ],
  templateUrl: './person-list.component.html',
  standalone: true,
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit{
  people = ['Perso1', 'Perso2', 'Perso3','Perso4', 'Perso5'];
  @Input() campaignId: number | null = null;

  ngOnInit(): void {
    if (this.campaignId) {
      console.log(`Loading participants for campaign ID: ${this.campaignId}`);
      // Implémentez la logique pour charger les participants
    }
  }
}
