import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCampaignComponent } from './show-campaign.component';

describe('ShowCampaignComponent', () => {
  let component: ShowCampaignComponent;
  let fixture: ComponentFixture<ShowCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
