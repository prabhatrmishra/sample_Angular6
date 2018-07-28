import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectTagsComponent } from './inspect-tags.component';

describe('InspectTagsComponent', () => {
  let component: InspectTagsComponent;
  let fixture: ComponentFixture<InspectTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
