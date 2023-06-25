import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CInscriptionComponent } from './c-inscription.component';

describe('CInscriptionComponent', () => {
  let component: CInscriptionComponent;
  let fixture: ComponentFixture<CInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
