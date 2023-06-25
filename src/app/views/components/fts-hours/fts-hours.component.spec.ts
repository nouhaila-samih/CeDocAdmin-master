import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtsHoursComponent } from './fts-hours.component';

describe('FtsHoursComponent', () => {
  let component: FtsHoursComponent;
  let fixture: ComponentFixture<FtsHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtsHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtsHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
