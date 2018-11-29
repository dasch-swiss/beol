import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditatioComponent } from './meditatio.component';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';

describe('MeditatioComponent', () => {
  let component: MeditatioComponent;
  let fixture: ComponentFixture<MeditatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          MeditatioComponent,
          ReadTextValueAsHtmlComponent,
          MathJaxDirective
      ],
        imports: [KuiViewerModule, RouterTestingModule]
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
