import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtDetailsComponent } from './ft-details.component';

describe('FtDetailsComponent', () => {
  let component: FtDetailsComponent;
  let fixture: ComponentFixture<FtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
