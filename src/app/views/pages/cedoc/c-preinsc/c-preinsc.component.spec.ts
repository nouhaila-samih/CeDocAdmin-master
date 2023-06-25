import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPreinscComponent } from './c-preinsc.component';

describe('CPreinscComponent', () => {
  let component: CPreinscComponent;
  let fixture: ComponentFixture<CPreinscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPreinscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPreinscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
