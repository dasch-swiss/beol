import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { MaterialModule } from '../../material-module';
import { ReadLinkValueComponent } from './read-link-value.component';

describe('ReadLinkValueComponent', () => {
  let component: ReadLinkValueComponent;
  let fixture: ComponentFixture<ReadLinkValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadLinkValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
