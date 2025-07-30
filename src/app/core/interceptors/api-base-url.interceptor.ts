import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/assets/')) {
    return next(req);
  }
  const apiReq = req.clone({
    url: environment.appUrl + req.url,
  });
  return next(apiReq);
};
