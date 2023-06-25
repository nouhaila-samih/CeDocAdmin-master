import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PListProfsComponent } from './p-list-profs.component';

describe('PListProfsComponent', () => {
  let component: PListProfsComponent;
  let fixture: ComponentFixture<PListProfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PListProfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PListProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
