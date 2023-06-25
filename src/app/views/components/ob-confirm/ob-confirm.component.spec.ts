import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObConfirmComponent } from './ob-confirm.component';

describe('ObConfirmComponent', () => {
  let component: ObConfirmComponent;
  let fixture: ComponentFixture<ObConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
