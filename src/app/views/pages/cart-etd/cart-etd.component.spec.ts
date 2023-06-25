import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEtdComponent } from './cart-etd.component';

describe('CartEtdComponent', () => {
  let component: CartEtdComponent;
  let fixture: ComponentFixture<CartEtdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartEtdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartEtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
