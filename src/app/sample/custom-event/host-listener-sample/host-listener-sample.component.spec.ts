/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HostListenerSampleComponent } from './host-listener-sample.component';

describe('HostListenerSampleComponent', () => {
  let component: HostListenerSampleComponent;
  let fixture: ComponentFixture<HostListenerSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostListenerSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListenerSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
