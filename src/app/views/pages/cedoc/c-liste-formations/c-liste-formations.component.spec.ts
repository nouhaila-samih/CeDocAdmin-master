import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListeFormationsComponent } from './c-liste-formations.component';

describe('CListeFormationsComponent', () => {
  let component: CListeFormationsComponent;
  let fixture: ComponentFixture<CListeFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CListeFormationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CListeFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
