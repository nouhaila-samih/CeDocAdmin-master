import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CReinscrDocsComponent } from './c-reinscr-docs.component';

describe('CReinscrDocsComponent', () => {
  let component: CReinscrDocsComponent;
  let fixture: ComponentFixture<CReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
