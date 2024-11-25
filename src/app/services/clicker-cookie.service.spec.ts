import { TestBed } from '@angular/core/testing';

import { ClickerCookieService } from './clicker-cookie.service';

describe('ClickerCookieService', () => {
  let service: ClickerCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickerCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
