import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIdBackTextComponent } from './svg-id-back-text.component';

describe('SvgIdBackTextComponent', () => {
  let component: SvgIdBackTextComponent;
  let fixture: ComponentFixture<SvgIdBackTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgIdBackTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgIdBackTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
