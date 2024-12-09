import { TestBed } from '@angular/core/testing';

import { CampaignManagementService } from './campaign-management.service';

describe('CampaignManagementService', () => {
  let service: CampaignManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
