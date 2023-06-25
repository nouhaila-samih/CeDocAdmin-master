import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDoctorantsComponent } from './c-doctorants.component';

describe('CDoctorantsComponent', () => {
  let component: CDoctorantsComponent;
  let fixture: ComponentFixture<CDoctorantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDoctorantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDoctorantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
