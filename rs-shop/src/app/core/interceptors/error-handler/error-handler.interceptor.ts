import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ERRORS_DESCRIPTIONS, SNACK_BAR } from '@core/common/constants';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackBar.open(ERRORS_DESCRIPTIONS.HTTP, SNACK_BAR.ACTION, SNACK_BAR.CONFIG);
        return throwError(error);
      }),
    );
  }
}

export const ERROR_HANDLER_INTERCEPTOR_PROVIDE_TOKEN = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerInterceptor,
  multi: true,
};
