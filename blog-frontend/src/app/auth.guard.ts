import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  return localStorage.getItem('access_token') ? true : router.parseUrl('/login');
};