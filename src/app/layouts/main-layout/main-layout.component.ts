import {Component, OnInit} from '@angular/core';
import {CharacterListComponent} from './components/character-list/character-list.component';
import {DisplayAreaComponent} from './components/display-area/display-area.component';
import {PersonListComponent} from './components/person-list/person-list.component';
import {ActivatedRoute} from '@angular/router';
import {CampaignManagementService} from '../../campaign-management/campaign-management.service';
import {NgForOf, NgIf} from '@angular/common';
import {CreateCampaignComponent} from '../../campaign-management/create-campaign/create-campaign.component';
import {CreateCharacterSheetComponent} from './components/create-character-sheet/create-character-sheet.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CharacterListComponent,
    DisplayAreaComponent,
    PersonListComponent,
    NgIf,
    NgForOf,
    CreateCampaignComponent,
    CreateCharacterSheetComponent
  ],
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  campaignId: number | null = null;
  campaignDetails: any = null; // Stocke les détails de la campagne
  isLoading: boolean = false;
  isCreatingCharacter: boolean = false;


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
        console.error('Failed to load campaign details:', err);
        this.isLoading = false;
      },
    });
  }

  toggleCreateCharacter() {
    this.isCreatingCharacter = !this.isCreatingCharacter;
  }

  loadYourCharacter() {
    // Logique pour recharger les campagnes de l'utilisateur (vous pouvez ajouter un appel API ici)
    console.log('Reload campaigns after creation');
  }
  createCharacter() {
    console.log('Création d’un nouveau personnage');
  }
}
