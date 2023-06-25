import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEncoursDocsComponent } from './c-encours-docs.component';

describe('CEncoursDocsComponent', () => {
  let component: CEncoursDocsComponent;
  let fixture: ComponentFixture<CEncoursDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEncoursDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CEncoursDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
