import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscBoursierComponent } from './reinsc-boursier.component';

describe('ReinscBoursierComponent', () => {
  let component: ReinscBoursierComponent;
  let fixture: ComponentFixture<ReinscBoursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinscBoursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinscBoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
