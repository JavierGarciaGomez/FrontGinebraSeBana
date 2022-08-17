import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBathPageComponent } from './edit-bath-page.component';

describe('EditBathPageComponent', () => {
  let component: EditBathPageComponent;
  let fixture: ComponentFixture<EditBathPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBathPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBathPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
