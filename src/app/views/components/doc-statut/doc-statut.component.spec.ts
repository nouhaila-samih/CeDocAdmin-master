import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocStatutComponent } from './doc-statut.component';

describe('DocStatutComponent', () => {
  let component: DocStatutComponent;
  let fixture: ComponentFixture<DocStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocStatutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
