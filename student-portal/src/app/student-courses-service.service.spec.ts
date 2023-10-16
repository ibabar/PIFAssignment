import { TestBed } from '@angular/core/testing';

import { StudentCoursesServiceService } from './student-courses-service.service';

describe('StudentCoursesServiceService', () => {
  let service: StudentCoursesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCoursesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
