import { TestBed } from '@angular/core/testing';

import { PNotifyService } from './services/pnotify.service';

describe('PnotifyService', () => {
  let service: PNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
