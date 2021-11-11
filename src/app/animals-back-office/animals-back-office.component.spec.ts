import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsBackOfficeComponent } from './animals-back-office.component';

describe('AnimalsBackOfficeComponent', () => {
  let component: AnimalsBackOfficeComponent;
  let fixture: ComponentFixture<AnimalsBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
