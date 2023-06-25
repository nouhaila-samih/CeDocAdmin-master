import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquePreinscriptionComponent } from './statistique-preinscription.component';

describe('StatistiquePreinscriptionComponent', () => {
  let component: StatistiquePreinscriptionComponent;
  let fixture: ComponentFixture<StatistiquePreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquePreinscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquePreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
