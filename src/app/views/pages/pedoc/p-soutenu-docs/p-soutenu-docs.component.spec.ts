import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSoutenuDocsComponent } from './p-soutenu-docs.component';

describe('PSoutenuDocsComponent', () => {
  let component: PSoutenuDocsComponent;
  let fixture: ComponentFixture<PSoutenuDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PSoutenuDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PSoutenuDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
