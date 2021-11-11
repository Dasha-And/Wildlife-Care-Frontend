import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesBackOfficeComponent } from './species-back-office.component';

describe('SpeciesBackOfficeComponent', () => {
  let component: SpeciesBackOfficeComponent;
  let fixture: ComponentFixture<SpeciesBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
