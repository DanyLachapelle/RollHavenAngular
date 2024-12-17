import {Component, OnInit} from '@angular/core';
import {CharacterListComponent} from './components/character-list/character-list.component';
import {DisplayAreaComponent} from './components/display-area/display-area.component';
import {PersonListComponent} from './components/person-list/person-list.component';
import {ActivatedRoute} from '@angular/router';
import {CampaignManagementService} from '../../campaign-management/campaign-management.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    CharacterListComponent,
    DisplayAreaComponent,
    PersonListComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './campaign.component.html',
  standalone: true,
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent implements OnInit {
  campaignId: number | null = null;
  campaignDetails: any = null; // Stocke les détails de la campagne
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignManagementService // Si nécessaire pour charger les détails
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID de la campagne
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.campaignId = Number(id);
      this.loadCampaignDetails(this.campaignId); // Chargez les données si nécessaire
    }
  }

  private loadCampaignDetails(campaignId: number): void {
    this.isLoading = true;
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (campaign) => {
        this.campaignDetails = campaign;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load campaign-management details:', err);
        this.isLoading = false;
      },
    });
  }
  createCharacter() {
    console.log('Création d’un nouveau personnage');
  }
}
