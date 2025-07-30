import { Token } from './../services/token';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: Token = inject(Token);
  const router = inject(Router);

  if (tokenService.getToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
