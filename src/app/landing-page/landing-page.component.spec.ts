import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material-module';
import { LandingPageComponent } from './landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CorrespondenceComponent } from '../correspondence/correspondence.component';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule],
      declarations: [LandingPageComponent, CorrespondenceComponent],
      providers: [{ provide: KuiCoreConfigToken, useValue: KuiCoreConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
