import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoursierComponent } from './new-boursier.component';

describe('NewBoursierComponent', () => {
  let component: NewBoursierComponent;
  let fixture: ComponentFixture<NewBoursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
