import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedocComponent } from './pedoc.component';

describe('PedocComponent', () => {
  let component: PedocComponent;
  let fixture: ComponentFixture<PedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
