import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PListSujetsComponent } from './p-list-sujets.component';

describe('PListSujetsComponent', () => {
  let component: PListSujetsComponent;
  let fixture: ComponentFixture<PListSujetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PListSujetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PListSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
