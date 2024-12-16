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

  activeTab: string = 'show-campaigns'; // Par défaut sur "Your Campaigns"
  publicCampaigns: any[] = [];
  userCampaigns: any = [];
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
    } else if (this.activeTab === 'show-campaigns') {
      this.loadYourCampaigns();
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    console.log(`Active tab: ${tab}`);

    if (tab === 'public-campaigns' && this.publicCampaigns.length === 0) {
      this.loadPublicCampaigns();
    } else if (tab === 'show-campaigns' && this.userCampaigns.length === 0) {
      this.loadYourCampaigns();
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

  joinCampaign(campaignId: number): void {
    const userId = this.getCurrentUserId(); // Méthode pour obtenir l'ID de l'utilisateur connecté
    if (!userId) {
      console.error('User not logged in.');
      alert('Please log in to join the campaign.');
      this.router.navigate(['/login']);  // Redirige vers la page de login si l'utilisateur n'est pas connecté
      return;
    }

    // Si l'utilisateur est connecté, on ajoute le joueur à la campagne
    this.campaignService.addPlayerToCampaign(campaignId, userId).subscribe({
      next: () => {
        console.log(`User ${userId} successfully added to campaign ${campaignId}`);
        alert('You have successfully joined the campaign!');
        this.viewCampaign(campaignId);
      },
      error: (err) => {
        console.error(`Failed to add user ${userId} to campaign ${campaignId}:`, err);
        alert('Failed to join the campaign. Please try again later.');
      },
    });
  }

  private getCurrentUserId(): number | null {
    // Remplace cette logique par la manière dont tu gères les utilisateurs connectés
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current User:', user);
    return user?.id || null;
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

  loadYourCampaigns() {
    const userId = this.getCurrentUserId(); // Obtient l'ID de l'utilisateur connecté
    if (!userId) {
      console.error('User not logged in.');
      alert('Please log in to view your campaigns.');
      this.router.navigate(['/login']); // Redirige vers la page de login si l'utilisateur n'est pas connecté
      return;
    }

    this.isLoading = true;
    this.campaignService.getYourCampaigns(userId).subscribe({
      next: (campaigns) => {
        console.log('Loaded user campaigns:', campaigns);
        this.userCampaigns = campaigns;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load your campaigns.';
        console.error(err);
        this.isLoading = false;
      },
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



}
