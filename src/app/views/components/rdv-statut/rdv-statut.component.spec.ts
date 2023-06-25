import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvStatutComponent } from './rdv-statut.component';

describe('RdvStatutComponent', () => {
  let component: RdvStatutComponent;
  let fixture: ComponentFixture<RdvStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvStatutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
