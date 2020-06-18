import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentListContainerComponent } from './attachment-list-container.component';

describe('AttachmentListContainerComponent', () => {
  let component: AttachmentListContainerComponent;
  let fixture: ComponentFixture<AttachmentListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
