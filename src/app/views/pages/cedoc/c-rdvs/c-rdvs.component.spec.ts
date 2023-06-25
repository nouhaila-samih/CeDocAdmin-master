import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRdvsComponent } from './c-rdvs.component';

describe('CRdvsComponent', () => {
  let component: CRdvsComponent;
  let fixture: ComponentFixture<CRdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRdvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
