import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvDeatilsComponent } from './rdv-deatils.component';

describe('RdvDeatilsComponent', () => {
  let component: RdvDeatilsComponent;
  let fixture: ComponentFixture<RdvDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvDeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
