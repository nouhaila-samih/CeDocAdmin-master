import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvReprogrammerComponent } from './rdv-reprogrammer.component';

describe('RdvReprogrammerComponent', () => {
  let component: RdvReprogrammerComponent;
  let fixture: ComponentFixture<RdvReprogrammerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvReprogrammerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvReprogrammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
