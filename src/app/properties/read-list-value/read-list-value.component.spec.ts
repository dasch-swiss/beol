import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';

import { ReadListValueComponent } from './read-list-value.component';

describe('ReadListValueComponent', () => {
  let component: ReadListValueComponent;
  let fixture: ComponentFixture<ReadListValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        ReadListValueComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadListValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
