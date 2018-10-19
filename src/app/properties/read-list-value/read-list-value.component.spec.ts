import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { ReadListValueComponent } from './read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';

describe('ReadListValueComponent', () => {
  let component: ReadListValueComponent;
  let fixture: ComponentFixture<ReadListValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        ReadListValueComponent,
        MathJaxDirective
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
