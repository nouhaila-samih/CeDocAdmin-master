import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDemandesInscriptionsComponent } from './c-demandes-inscriptions.component';

describe('CDemandesInscriptionsComponent', () => {
  let component: CDemandesInscriptionsComponent;
  let fixture: ComponentFixture<CDemandesInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDemandesInscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDemandesInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
