import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcardpreviewComponent } from './idcardpreview.component';

describe('IdcardpreviewComponent', () => {
  let component: IdcardpreviewComponent;
  let fixture: ComponentFixture<IdcardpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdcardpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcardpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
