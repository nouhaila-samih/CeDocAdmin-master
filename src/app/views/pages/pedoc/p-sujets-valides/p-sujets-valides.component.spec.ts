import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSujetsValidesComponent } from './p-sujets-valides.component';

describe('PSujetsValidesComponent', () => {
  let component: PSujetsValidesComponent;
  let fixture: ComponentFixture<PSujetsValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PSujetsValidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PSujetsValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
