import { TestBed } from '@angular/core/testing';

import { SpinnerControllerInterceptor } from './spinner-controller.interceptor';

describe('SpinnerControllerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SpinnerControllerInterceptor],
  }));

  it('should be created', () => {
    const interceptor: SpinnerControllerInterceptor = TestBed.inject(SpinnerControllerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
