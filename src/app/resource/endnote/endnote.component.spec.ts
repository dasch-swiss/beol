import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndnoteComponent } from './endnote.component';

describe('EndnoteComponent', () => {
  let component: EndnoteComponent;
  let fixture: ComponentFixture<EndnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndnoteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
