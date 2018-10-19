import { TestBed, inject } from '@angular/core/testing';

import { BeolService } from './beol.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BeolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BeolService]
    });
  });

  it('should be created', inject([BeolService], (service: BeolService) => {
    expect(service).toBeTruthy();
  }));
});
