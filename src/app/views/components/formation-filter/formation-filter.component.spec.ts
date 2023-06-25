import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationFilterComponent } from './formation-filter.component';

describe('FormationFilterComponent', () => {
  let component: FormationFilterComponent;
  let fixture: ComponentFixture<FormationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
