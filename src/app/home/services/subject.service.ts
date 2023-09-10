import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { SubjectResponse } from 'src/app/interfaces/subject.interfaces';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  constructor( public http: HttpClient ) { }

  base_url: string = environment.base_url;

  getSubjects(): Observable<SubjectResponse> {
    return this.http.get<SubjectResponse>(`${this.base_url}/subject`)
      .pipe(
        catchError( err => of(err.error.msg) )
      );
  }

}
