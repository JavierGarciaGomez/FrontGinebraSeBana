import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPetsPageComponent } from './public-pets-page.component';

describe('PublicPetsPageComponent', () => {
  let component: PublicPetsPageComponent;
  let fixture: ComponentFixture<PublicPetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPetsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
