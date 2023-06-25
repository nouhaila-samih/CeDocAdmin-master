import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNotReinscrDocsComponent } from './c-not-reinscr-docs.component';

describe('CNotReinscrDocsComponent', () => {
  let component: CNotReinscrDocsComponent;
  let fixture: ComponentFixture<CNotReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNotReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CNotReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
