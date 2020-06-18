/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventServiceSampleService } from './event-service-sample.service';

describe('Service: EventServiceSample', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventServiceSampleService]
    });
  });

  it('should ...', inject([EventServiceSampleService], (service: EventServiceSampleService) => {
    expect(service).toBeTruthy();
  }));
});
