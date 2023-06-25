import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewboursierComponent } from './p-newboursier.component';

describe('PNewboursierComponent', () => {
  let component: PNewboursierComponent;
  let fixture: ComponentFixture<PNewboursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PNewboursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PNewboursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
