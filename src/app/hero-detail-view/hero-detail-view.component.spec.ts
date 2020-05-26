import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailViewComponent } from './hero-detail-view.component';

describe('HeroDetailViewComponent', () => {
  let component: HeroDetailViewComponent;
  let fixture: ComponentFixture<HeroDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
