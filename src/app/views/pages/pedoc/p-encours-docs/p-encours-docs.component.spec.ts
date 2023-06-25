import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEncoursDocsComponent } from './p-encours-docs.component';

describe('PEncoursDocsComponent', () => {
  let component: PEncoursDocsComponent;
  let fixture: ComponentFixture<PEncoursDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PEncoursDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PEncoursDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
