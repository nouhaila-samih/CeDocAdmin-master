import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListSujetsComponent } from './c-list-sujets.component';

describe('CListSujetsComponent', () => {
  let component: CListSujetsComponent;
  let fixture: ComponentFixture<CListSujetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CListSujetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CListSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
