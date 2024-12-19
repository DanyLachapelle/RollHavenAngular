import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {CampaignManagementService} from '../../../../campaign-management/campaign-management.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './person-list.component.html',
  standalone: true,
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit{
  people:any[]=[]
  @Input() campaignId: number | null = null;
  currentUser: any=null;
  currentUserRoleInCampaign: string = '';

  constructor(private campaignService: CampaignManagementService,private router: Router) {}
  ngOnInit(): void {
    this.loadCurrentUser();
    if (this.campaignId) {
      console.log(`Loading participants for campaign ID: ${this.campaignId}`);
      this.loadUsersByCampaign();
    }
  }
  loadCurrentUser(): void {
    // Simuler la récupération de l'utilisateur actuel (vous pouvez remplacer par une logique réelle)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  loadUsersByCampaign(): void {
    if (this.campaignId) {
      this.campaignService.getUsersByCampaignId(this.campaignId).subscribe(
          (users) => {
            this.people = users;
            console.log('Users loaded:', users);
            this.setCurrentUserRoleInCampaign(users);  // Vérifier le rôle de l'utilisateur dans la campagne
          },
          (error) => {
            console.error('Error loading users:', error);
          }
      );
    }
  }

  setCurrentUserRoleInCampaign(users: any[]): void {
    // Rechercher le rôle de l'utilisateur actuel parmi les utilisateurs de la campagne
    const currentUserInCampaign = users.find(user => user.userId === this.currentUser.id);
    if (currentUserInCampaign) {
      this.currentUserRoleInCampaign = currentUserInCampaign.role;  // Stocke le rôle de l'utilisateur dans la campagne
    }
  }

  leaveCampaign(): void {
    const userId = this.getCurrentUserId();
    if (!userId || !this.campaignId) {
      console.error('User ID or campaign ID is invalid.');
      return;
    }

    this.campaignService.leaveCampaign(this.campaignId, userId).subscribe({
      next: () => {
        console.log(`User ${userId} has left the campaign ${this.campaignId}`);
        alert('You have successfully left the campaign.');
        this.router.navigate(['/campaign-management']); // Rediriger vers la page des campagnes
      },
      error: (err) => {
        console.error('Failed to leave the campaign:', err);
        alert('Failed to leave the campaign. Please try again later.');
      },
    });
  }

  private getCurrentUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || null; // Assurez-vous que l'utilisateur est connecté
  }

  deleteCampaign(): void {
    if (this.campaignId) {
      this.campaignService.deleteCampaign(this.campaignId).subscribe(
          (response) => {
            console.log('Campaign deleted:', response);
            alert('Campaign deleted successfully!');
            this.router.navigate(['/campaign-management']);  // Rediriger vers la liste des campagnes
          },
          (error) => {
            console.error('Error deleting campaign:', error);
            alert('Failed to delete the campaign.');
          }
      );
    }
  }
}
