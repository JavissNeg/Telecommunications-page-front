import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RegisterRequest, RegisterResponse } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient ) { }

  base_url: string = environment.base_url;
  
  createUser( data: RegisterRequest ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.base_url}/login/add`, data)
      .pipe( catchError( err => of(err.error) ) );
  }
  
}
