import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmWidgetComponent } from './alarm-widget.component';

describe('AlarmWidgetComponent', () => {
  let component: AlarmWidgetComponent;
  let fixture: ComponentFixture<AlarmWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
