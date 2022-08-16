import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetPageComponent } from './edit-pet-page.component';

describe('EditPetPageComponent', () => {
  let component: EditPetPageComponent;
  let fixture: ComponentFixture<EditPetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
