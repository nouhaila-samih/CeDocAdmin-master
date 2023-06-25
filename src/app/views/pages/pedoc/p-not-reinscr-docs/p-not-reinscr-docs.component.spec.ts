import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNotReinscrDocsComponent } from './p-not-reinscr-docs.component';

describe('PNotReinscrDocsComponent', () => {
  let component: PNotReinscrDocsComponent;
  let fixture: ComponentFixture<PNotReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PNotReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PNotReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
