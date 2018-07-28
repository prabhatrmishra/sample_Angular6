import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainEntityComponent } from './train-entity.component';

describe('TrainEntityComponent', () => {
  let component: TrainEntityComponent;
  let fixture: ComponentFixture<TrainEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
