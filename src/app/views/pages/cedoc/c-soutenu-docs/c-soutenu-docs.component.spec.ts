import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSoutenuDocsComponent } from './c-soutenu-docs.component';

describe('CSoutenuDocsComponent', () => {
  let component: CSoutenuDocsComponent;
  let fixture: ComponentFixture<CSoutenuDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSoutenuDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSoutenuDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
