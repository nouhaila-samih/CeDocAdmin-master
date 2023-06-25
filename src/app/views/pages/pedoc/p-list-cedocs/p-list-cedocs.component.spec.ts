import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PListCedocsComponent } from './p-list-cedocs.component';

describe('PListCedocsComponent', () => {
  let component: PListCedocsComponent;
  let fixture: ComponentFixture<PListCedocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PListCedocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PListCedocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
