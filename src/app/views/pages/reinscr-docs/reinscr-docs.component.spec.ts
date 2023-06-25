import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscrDocsComponent } from './reinscr-docs.component';

describe('ReinscrDocsComponent', () => {
  let component: ReinscrDocsComponent;
  let fixture: ComponentFixture<ReinscrDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinscrDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinscrDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
