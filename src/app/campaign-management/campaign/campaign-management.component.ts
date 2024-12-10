import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {CampaignManagementService} from '../campaign-management.service';
import {CreateCampaignComponent} from '../create-campaign/create-campaign.component';

@Component({
  selector: 'app-campaign-management',
  imports: [
    NgIf,
    NgForOf,
    CreateCampaignComponent
  ],
  templateUrl: './campaign-management.component.html',
  standalone: true,
  styleUrl: './campaign-management.component.css'
})
export class CampaignManagementComponent implements OnInit{

  activeTab: string = 'your-campaigns'; // Par défaut sur "Your Campaigns"
  publicCampaigns: any[] = [];
  isLoading = false;
  errorMessage = '';
  isCreatingCampaign: boolean = false;

  constructor(private router: Router, private campaignService: CampaignManagementService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id');
    if (campaignId) {
      this.loadCampaignDetails(Number(campaignId));
    } else if (this.activeTab === 'public-campaigns') {
      this.loadPublicCampaigns();
    }
  }
  selectTab(tab: string) {
    this.activeTab = tab;
    console.log(`Active tab: ${tab}`);
    // Ajoute ici des actions spécifiques à chaque onglet si nécessaire
    if (tab === 'public-campaigns') {
      this.loadPublicCampaigns();
    }
  }

  private loadCampaignDetails(campaignId: number): void {
    this.isLoading = true;
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (campaign) => {
        // Logique pour gérer les détails de la campagne
        console.log('Campaign details:', campaign);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load campaign details.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }




  viewAccountInfo() {
    this.router.navigate(['/info-account']);
  }

  private loadPublicCampaigns() {
    this.isLoading = true;
    this.campaignService.getPublicCampaigns().subscribe({
      next: (campaigns) => {
        console.log('Loaded campaigns:', campaigns); // Log pour vérifier les campagnes
        this.publicCampaigns = campaigns;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load public campaigns.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  viewCampaign(campaignId: number | undefined): void {
    if (campaignId == null || isNaN(campaignId)) {
      console.error('Campaign ID is undefined or invalid.');
      return;
    }
    this.router.navigate(['/campaign', campaignId]);
  }

  toggleCreateCampaign() {
    this.isCreatingCampaign = !this.isCreatingCampaign;
  }

  loadYourCampaigns() {
    // Logique pour recharger les campagnes de l'utilisateur (vous pouvez ajouter un appel API ici)
    console.log('Reload campaigns after creation');
  }
}
