import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioItemsComponent } from './biblio-items.component';

describe('BiblioItemsComponent', () => {
  let component: BiblioItemsComponent;
  let fixture: ComponentFixture<BiblioItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
