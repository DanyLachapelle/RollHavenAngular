import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CampaignManagementService} from '../campaign-management.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-campaign.component.html',
  standalone: true,
  styleUrl: './create-campaign.component.css'
})
export class CreateCampaignComponent {
  campaignForm: FormGroup;
  successMessage: string | null = null;
  @Output() campaignCreated = new EventEmitter<unknown>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private campaignService: CampaignManagementService
  ) {
    // Initialiser le formulaire
    this.campaignForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      accessibility: ['', Validators.required]
    });
  }
  private getCurrentUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current User:', user);
    return user?.id || null;
  }
  createCampaign() {
    if (this.campaignForm.valid) {
      const campaignData = this.campaignForm.value;

      // Récupérer l'ID de l'utilisateur connecté
      const userId = this.getCurrentUserId();

      if (userId === null) {
        this.successMessage = 'User is not logged in.';
        return;
      }

      // Appel au service pour créer une campagne
      this.campaignService.createCampaign(userId, campaignData).subscribe({
        next: (response) => {
          console.log('Campaign created successfully:', response);
          this.successMessage = 'Campaign created successfully!';
          const campaignId = response.id;
          this.router.navigate(['/campaign', campaignId]);
          this.campaignForm.reset(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Error creating campaign:', err);
          if (err.error && err.error.message === 'This campaign name already exists.') {
            this.successMessage = 'This campaign name already exists. Please choose another one.';
          } else {
            this.successMessage = 'An error occurred while creating the campaign.';
          }
        }
      });
    } else {
      this.successMessage = 'Please fill in all required fields.';
    }
  }

  viewCampaign(campaignId: number | undefined): void {
    if (campaignId == null || isNaN(campaignId)) {
      console.error('Campaign ID is undefined or invalid.');
      return;
    }
    this.router.navigate(['/campaign', campaignId]);
  }
}
