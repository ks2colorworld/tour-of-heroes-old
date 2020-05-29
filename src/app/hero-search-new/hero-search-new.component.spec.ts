import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchNewComponent } from './hero-search-new.component';

describe('HeroSearchNewComponent', () => {
  let component: HeroSearchNewComponent;
  let fixture: ComponentFixture<HeroSearchNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
