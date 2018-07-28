import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainProfileComponent } from './train-profile.component';

describe('TrainProfileComponent', () => {
  let component: TrainProfileComponent;
  let fixture: ComponentFixture<TrainProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
