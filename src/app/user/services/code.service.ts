import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { verifyCodePost } from '../interfaces/code.interface';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor( private html: HttpClient ) { }

  base_url: string = environment.base_url;

  sendCode( phone: string ) {
    return this.html.post(
      `${this.base_url}/code/send`, 
      { phone }
    );
  }

  verifyCode( phone: string, code: string ): Observable<any> {
    return this.html.post(`${this.base_url}/code/verify`, { phone, code } )
      .pipe( catchError( err => of(err.error) ));
  }
}
