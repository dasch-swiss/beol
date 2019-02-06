import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LeooRouteComponent } from './leoo-route.component';
import { of } from 'rxjs';
import { KuiCoreConfig } from '@knora/core';

describe('LeooRouteComponent', () => {
  let component: LeooRouteComponent;
  let fixture: ComponentFixture<LeooRouteComponent>;
  const rn = '721';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LeooRouteComponent],
      providers: [
        {
          provide: ActivatedRoute,
            useValue: { paramMap: of({
                    get: () => {
                        return rn;
                    }
                })}
        },
        { provide: 'config', useValue: KuiCoreConfig }
      ]
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
