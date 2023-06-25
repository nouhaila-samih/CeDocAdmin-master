import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListFdsComponent } from './c-list-fds.component';

describe('CListFdsComponent', () => {
  let component: CListFdsComponent;
  let fixture: ComponentFixture<CListFdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CListFdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CListFdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
