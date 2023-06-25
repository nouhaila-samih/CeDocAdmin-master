import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CReinscboursierComponent } from './c-reinscboursier.component';

describe('CReinscboursierComponent', () => {
  let component: CReinscboursierComponent;
  let fixture: ComponentFixture<CReinscboursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CReinscboursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CReinscboursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
