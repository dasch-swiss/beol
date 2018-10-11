import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeooRouteComponent } from './leoo-route.component';

describe('LeooRouteComponent', () => {
  let component: LeooRouteComponent;
  let fixture: ComponentFixture<LeooRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeooRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeooRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
