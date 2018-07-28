import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectLandingComponent } from './inspect-landing.component';

describe('InspectLandingComponent', () => {
  let component: InspectLandingComponent;
  let fixture: ComponentFixture<InspectLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
