import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CampaignManagementService} from '../campaign-management.service';
import {NgIf} from '@angular/common';

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
    private fb: FormBuilder,
    private campaignService: CampaignManagementService
  ) {
    // Initialiser le formulaire
    this.campaignForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      accessibility: ['', Validators.required]
    });
  }

  createCampaign() {
    if (this.campaignForm.valid) {
      const campaignData = this.campaignForm.value;

      // Appel au service pour créer une campagne
      this.campaignService.createCampaign(campaignData).subscribe({
        next: (response) => {
          console.log('Campaign created successfully:', response);
          this.successMessage = 'Campaign created successfully!';
          this.campaignForm.reset(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Error creating campaign:', err);
          this.successMessage = 'An error occurred while creating the campaign.';
        }
      });
    }
  }
}
