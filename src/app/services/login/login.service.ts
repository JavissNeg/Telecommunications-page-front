import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  logged_in ( username: string ) {
    localStorage.setItem('hasLogin', 'true');
    localStorage.setItem('username', username);
  }
  
  logged_out () {
    localStorage.removeItem('hasLogin');
    localStorage.removeItem('username');
  }
  
  is_logged_in(): boolean {
    const hasLogin = localStorage.getItem('hasLogin');
    if ( hasLogin === 'true' ) {
      return true;
    }
    return false;
  }
}
