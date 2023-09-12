import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Auth, AuthResponse } from 'src/app/user/interfaces/login.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() loginEmmiter = new EventEmitter<boolean>();
  base_url = environment.base_url;

  constructor( private http: HttpClient ) { }


  auth( data: Auth ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base_url}/login/auth`, data)
      .pipe(
        catchError( err => of(err.error) )
      );
  }

  logged_in ( username: string ) {
    localStorage.setItem('hasLogin', 'true');
    localStorage.setItem('username', username);
    this.loginEmmiter.emit(true);
    window.location.reload();
  }
  
  logged_out () {
    localStorage.removeItem('hasLogin');
    localStorage.removeItem('username');
    this.loginEmmiter.emit(false);
    window.location.reload();
  }
  
  is_logged_in(): boolean {
    const hasLogin = localStorage.getItem('hasLogin');
    if ( hasLogin === 'true' ) {
      return true;
    }
    return false;
  }
}
