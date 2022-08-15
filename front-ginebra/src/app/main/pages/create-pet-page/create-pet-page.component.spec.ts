import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetPageComponent } from './create-pet-page.component';

describe('CreatePetPageComponent', () => {
  let component: CreatePetPageComponent;
  let fixture: ComponentFixture<CreatePetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
