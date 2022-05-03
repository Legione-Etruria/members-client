import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiHttpErrorHandlerInterceptor } from './interceptors/api-http-error-handler.interceptor';
import {
  ApiHttpService,
  apiHttpServiceCreator,
} from './services/api-http.service';

/**
 * Inspirated by https://medium.com/@admin_87321/extending-angular-httpclient-6b33a7a1a4d0
 */

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    // Providing the ApiHttpService so it could be used as a service.
    {
      provide: ApiHttpService,
      useFactory: apiHttpServiceCreator,
      deps: [HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class ApiHttpModule {}
