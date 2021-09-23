import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerService } from '@core/services/spinner/spinner.service';

@Injectable()
export class SpinnerControllerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    return next.handle(request)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
      );
  }
}

export const SPINNER_CONTROLLER_INTERCEPTOR_PROVIDE_TOKEN = {
  provide: HTTP_INTERCEPTORS,
  useClass: SpinnerControllerInterceptor,
  multi: true,
};
