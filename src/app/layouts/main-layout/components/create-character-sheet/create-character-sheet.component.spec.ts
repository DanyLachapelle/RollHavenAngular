import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterSheetComponent } from './create-character-sheet.component';

describe('CreateCharacterSheetComponent', () => {
  let component: CreateCharacterSheetComponent;
  let fixture: ComponentFixture<CreateCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
