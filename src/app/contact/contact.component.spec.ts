import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material-module';
import { ContactComponent } from './contact.component';
import { Location } from '@angular/common';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ContactComponent],
      providers: [{ provide: Location }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
