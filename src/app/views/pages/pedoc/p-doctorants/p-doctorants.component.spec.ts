import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDoctorantsComponent } from './p-doctorants.component';

describe('PDoctorantsComponent', () => {
  let component: PDoctorantsComponent;
  let fixture: ComponentFixture<PDoctorantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDoctorantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDoctorantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
