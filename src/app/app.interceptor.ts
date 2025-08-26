import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const endpoints = {
  b4app: 'https://parseapi.back4app.com',
  tmdb: 'https://api.themoviedb.org/3',
  watchlists: '/classes/watchlists',
  comments: '/classes/comments',
};

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private readonly USER_KEY = '[user]';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/api')) {
      request = request.clone({
        url: request.url.replace('/api', endpoints.b4app),
        withCredentials: true,
      });
    }
    if (request.url.includes('/watchlists')) {
      request = request.clone({
        url: request.url.replace('/watchlists', endpoints.watchlists),
      });
    }
    if (request.url.includes('/comments')) {
      request = request.clone({
        url: request.url.replace('/comments', endpoints.comments),
      });
    }
    if (request.url.includes('/login')) {
      request = request.clone({
        url: request.url.replace('/comments', endpoints.comments),
      });
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.url?.includes('/login')) {
          console.log(event.body);
          localStorage.removeItem(this.USER_KEY);
          localStorage.setItem(this.USER_KEY, JSON.stringify(event.body));
        }
      })
    );
  }
}

export const appInterceptorPtovider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
