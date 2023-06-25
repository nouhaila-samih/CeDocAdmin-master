import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNewboursierComponent } from './c-newboursier.component';

describe('CNewboursierComponent', () => {
  let component: CNewboursierComponent;
  let fixture: ComponentFixture<CNewboursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNewboursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CNewboursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
