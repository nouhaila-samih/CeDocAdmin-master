import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDocDetailsComponent } from './full-doc-details.component';

describe('FullDocDetailsComponent', () => {
  let component: FullDocDetailsComponent;
  let fixture: ComponentFixture<FullDocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullDocDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
