import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRdvsComponent } from './p-rdvs.component';

describe('PRdvsComponent', () => {
  let component: PRdvsComponent;
  let fixture: ComponentFixture<PRdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRdvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PRdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
