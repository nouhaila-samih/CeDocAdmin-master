import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PInscriptionsComponent } from './p-inscriptions.component';

describe('PInscriptionsComponent', () => {
  let component: PInscriptionsComponent;
  let fixture: ComponentFixture<PInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PInscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
