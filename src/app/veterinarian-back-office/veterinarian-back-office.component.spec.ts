import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianBackOfficeComponent } from './veterinarian-back-office.component';

describe('VeterinarianBackOfficeComponent', () => {
  let component: VeterinarianBackOfficeComponent;
  let fixture: ComponentFixture<VeterinarianBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinarianBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinarianBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
