import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCheckComponent } from './view-check.component';

describe('ViewCheckComponent', () => {
  let component: ViewCheckComponent;
  let fixture: ComponentFixture<ViewCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
