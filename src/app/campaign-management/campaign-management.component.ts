import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-campaign-management',
  imports: [
    NgIf
  ],
  templateUrl: './campaign-management.component.html',
  standalone: true,
  styleUrl: './campaign-management.component.css'
})
export class CampaignManagementComponent{

  activeTab: string = 'your-campaigns'; // Par défaut sur "Your Campaigns"

  selectTab(tab: string) {
    this.activeTab = tab;
    console.log(`Active tab: ${tab}`);
    // Ajoute ici des actions spécifiques à chaque onglet si nécessaire
  }

  constructor(private router: Router) {}

  viewAccountInfo() {
    this.router.navigate(['/info-account']);
  }

}
