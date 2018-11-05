import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditatioComponent } from './meditatio.component';

describe('MeditatioComponent', () => {
  let component: MeditatioComponent;
  let fixture: ComponentFixture<MeditatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
