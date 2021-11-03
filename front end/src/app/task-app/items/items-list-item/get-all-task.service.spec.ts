import { TestBed } from '@angular/core/testing';

import { GetAllTaskService } from './get-all-task.service';

describe('GetAllTaskService', () => {
  let service: GetAllTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
