import {Component, OnInit} from '@angular/core';
import {CampaignManagementService} from '../../../../campaign-management/campaign-management.service';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-display-area',
  imports: [
    NgIf
  ],
  templateUrl: './display-area.component.html',
  standalone: true,
  styleUrl: './display-area.component.css'
})
export class DisplayAreaComponent implements OnInit{
  campaignId: number = 0;
  campaignDetails: any = null;
  isLoading: boolean = true;

  constructor(
    private campaignService: CampaignManagementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.campaignId = Number(id);
      this.loadCampaignDetails(this.campaignId); // Chargez les données si nécessaire
    }
  }

  // Fonction pour récupérer les détails de la campagne
  loadCampaignDetails(campaignId: number): void {
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
}
