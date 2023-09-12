import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Auth, AuthResponse, LoginResponse } from 'src/app/user/interfaces/login.interface';
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

    const login: Observable<LoginResponse> =  this.http.get<LoginResponse>(`${this.base_url}/login/${username}`)
      .pipe(
        catchError( err => of(err.error) )
      );
    
    login.subscribe( res => {
      if ( res.success ) {
        localStorage.setItem( 'login_id', String(res.data.login_id) );
        window.location.reload();
      }
    });
  }
  
  logged_out () {
    localStorage.removeItem('hasLogin');
    localStorage.removeItem('username');
    localStorage.removeItem('login_id');
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


  // No used
  setIdLogin( username: string ) {
    const login: Observable<LoginResponse> =  this.http.get<LoginResponse>(`${this.base_url}/login/${username}`)
      .pipe(
        catchError( err => of(err.error) )
      );
    
    login.subscribe( res => {
      if ( res.success )
        localStorage.setItem( 'login_id', String(res.data.login_id) );
    });
  }
}
