import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenuComponent } from './soutenu.component';

describe('SoutenuComponent', () => {
  let component: SoutenuComponent;
  let fixture: ComponentFixture<SoutenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoutenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
