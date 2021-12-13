import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineBackOfficeComponent } from './vaccine-back-office.component';

describe('VaccineBackOfficeComponent', () => {
  let component: VaccineBackOfficeComponent;
  let fixture: ComponentFixture<VaccineBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
