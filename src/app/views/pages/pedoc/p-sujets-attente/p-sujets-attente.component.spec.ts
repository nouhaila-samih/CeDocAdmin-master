import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSujetsAttenteComponent } from './p-sujets-attente.component';

describe('PSujetsAttenteComponent', () => {
  let component: PSujetsAttenteComponent;
  let fixture: ComponentFixture<PSujetsAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PSujetsAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PSujetsAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
