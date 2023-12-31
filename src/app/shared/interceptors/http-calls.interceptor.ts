import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    if (!request.url.includes('/login')) {
      const headers = new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      });
      request = request.clone({
        headers: headers,
        withCredentials: true,
      });
    }
    return next.handle(request);
  }
}
