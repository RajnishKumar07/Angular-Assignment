import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../services/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: Token = inject(Token);
  const authToken = tokenService.getToken();
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
  }
  return next(req);
};
