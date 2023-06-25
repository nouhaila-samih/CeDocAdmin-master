import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReinscrDocsComponent } from './not-reinscr-docs.component';

describe('NotReinscrDocsComponent', () => {
  let component: NotReinscrDocsComponent;
  let fixture: ComponentFixture<NotReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
