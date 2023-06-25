import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PReinscboursierComponent } from './p-reinscboursier.component';

describe('PReinscboursierComponent', () => {
  let component: PReinscboursierComponent;
  let fixture: ComponentFixture<PReinscboursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PReinscboursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PReinscboursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
