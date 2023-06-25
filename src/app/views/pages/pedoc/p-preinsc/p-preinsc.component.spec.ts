import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPreinscComponent } from './p-preinsc.component';

describe('PPreinscComponent', () => {
  let component: PPreinscComponent;
  let fixture: ComponentFixture<PPreinscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PPreinscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PPreinscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
