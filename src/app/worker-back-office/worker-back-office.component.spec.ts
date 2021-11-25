import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBackOfficeComponent } from './worker-back-office.component';

describe('WorkerBackOfficeComponent', () => {
  let component: WorkerBackOfficeComponent;
  let fixture: ComponentFixture<WorkerBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
