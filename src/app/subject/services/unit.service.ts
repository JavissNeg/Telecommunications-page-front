import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UnitResponse } from '../interface/unit.interface';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor( public http: HttpClient ) { }

  base_url = environment.base_url;

  getUnitsBySubjectID( subject_id: number ): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(`${ this.base_url }/unit/${ subject_id }`)
      .pipe(
        catchError( err => of(err.error)) 
      );
  }

  getUnitByID( unit_id: number ): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(`${ this.base_url }/unit/${ unit_id }`)
      .pipe(
        catchError( err => of(err.error)) 
      );
  }
}
