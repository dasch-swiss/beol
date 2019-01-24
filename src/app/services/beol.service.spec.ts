import { TestBed, inject } from '@angular/core/testing';

import { BeolService } from './beol.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KuiCoreConfig } from '../../../node_modules/@knora/core';

describe('BeolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          HttpClientModule,
          HttpClientTestingModule],
      providers: [
          BeolService,
          { provide: 'config', useValue: KuiCoreConfig }
      ]
    });
  });

  it('should be created', inject([BeolService], (service: BeolService) => {
    expect(service).toBeTruthy();
  }));
});
