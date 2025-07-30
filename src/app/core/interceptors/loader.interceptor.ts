import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize } from 'rxjs';
import { Loader } from '../../../shared/services/loader';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService: Loader = inject(Loader);
  loaderService.start();
  console.log('loader');
  return next(req).pipe(finalize(() => loaderService.stop()));
};
