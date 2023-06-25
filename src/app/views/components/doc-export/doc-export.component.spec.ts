import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExportComponent } from './doc-export.component';

describe('DocExportComponent', () => {
  let component: DocExportComponent;
  let fixture: ComponentFixture<DocExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
