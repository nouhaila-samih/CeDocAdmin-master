import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListProfsComponent } from './c-list-profs.component';

describe('CListProfsComponent', () => {
  let component: CListProfsComponent;
  let fixture: ComponentFixture<CListProfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CListProfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CListProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
