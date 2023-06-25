import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PReinscrDocsComponent } from './p-reinscr-docs.component';

describe('PReinscrDocsComponent', () => {
  let component: PReinscrDocsComponent;
  let fixture: ComponentFixture<PReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
