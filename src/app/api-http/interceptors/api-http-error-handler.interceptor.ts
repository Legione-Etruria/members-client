import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiHttpErrorHandlerInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if backends handle the errors and returns an errors array with all the errors
        // I simply throw that error
        if (error.error && error.error.errors) {
          return throwError(() => error);
        }

        const errorObj = {
          ...error,
          error: {
            ...error.error,
            errors: [{ message: error.message }],
          },
        };

        // otherwise I need to style a little bit the error to make it similiar to the backends
        return throwError(() => errorObj);
      })
    );
  }
}
