import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalstorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.localStorage.obter('token');
    if (token) {
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(tokenRequest);
    } else {
      return next.handle(req);
    }
  }
}
