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
  currentUserRoleInCampaign: string = '';

  constructor(
    private campaignService: CampaignManagementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.campaignId = parseInt(idParam, 10);
      this.loadCampaignDetails();
      this.checkCurrentUserRole();
    }
  }

  loadCampaignDetails(): void {
    this.campaignService.getCampaignById(this.campaignId).subscribe(
        (details) => {
          this.campaignDetails = details;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching campaign details:', error);
          this.isLoading = false;
        }
    );
  }


  checkCurrentUserRole(): void {
    const currentUserId = this.getCurrentUserId();
    if (!currentUserId) {
      console.error('No user is currently logged in.');
      return;
    }

    // Récupérer les utilisateurs de la campagne pour trouver le rôle
    this.campaignService.getUsersByCampaignId(this.campaignId).subscribe(
        (users) => {
          const userInCampaign = users.find((user) => user.userId === currentUserId);
          this.currentUserRoleInCampaign = userInCampaign ? userInCampaign.role : null;
        },
        (error) => console.error('Error fetching campaign users:', error)
    );
  }
  private getCurrentUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || null; // Assurez-vous que l'utilisateur est connecté
  }
}
