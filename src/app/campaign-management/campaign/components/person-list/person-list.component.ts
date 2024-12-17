import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CampaignManagementService} from '../../../../campaign-management/campaign-management.service';

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
  people:any[]=[]
  @Input() campaignId: number | null = null;

  constructor(private campaignService: CampaignManagementService) {}
  ngOnInit(): void {
    if (this.campaignId) {
      console.log(`Loading participants for campaign ID: ${this.campaignId}`);
      this.loadUsersByCampaign();
    }
  }

  loadUsersByCampaign(): void {
    if (this.campaignId) {
      this.campaignService.getUsersByCampaignId(this.campaignId).subscribe(
        (users) => {
          this.people = users; // Remplir la liste avec les utilisateurs récupérés
          console.log('Users loaded:', users);
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    }
  }
}
