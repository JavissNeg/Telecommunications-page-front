import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const accessLoginGuard: CanActivateFn = (route, state) => {
  
  const hasLogin = localStorage.getItem('hasLogin');
  if ( hasLogin === 'true' ) {
    return true;
  }

  const router = inject(Router);
  router.navigate(['user/login']);
  return false;
  
};


export const noAccessLoginGuard: CanActivateFn = (route, state) => {
  
  const hasLogin = localStorage.getItem('hasLogin');
  if ( hasLogin === null ) {
    return true;
  }
  
  const router = inject(Router);
  router.navigate(['/home']);
  return false;
  
};


