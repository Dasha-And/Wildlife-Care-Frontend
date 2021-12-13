import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminBackOfficeComponent } from './superadmin-back-office.component';

describe('SuperadminBackOfficeComponent', () => {
  let component: SuperadminBackOfficeComponent;
  let fixture: ComponentFixture<SuperadminBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
