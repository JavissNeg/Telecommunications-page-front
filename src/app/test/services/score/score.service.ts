import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ScoreRequest, ScoreResponse, ScoreResponseGet } from '../../interfaces/score.intefaces';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  base_url = environment.base_url;
  constructor( private http: HttpClient ) { }

  getScoresByUnitAndLogin( unit: number, login: number ): Observable<ScoreResponseGet> {
    return this.http.get<ScoreResponseGet>(`${this.base_url}/score/${unit}/${login}`)
      .pipe(
        catchError( err => of(err.error) )
      );
  }

  addScore( data: ScoreRequest ): Observable<ScoreResponse> {
    return this.http.post<ScoreResponse>(`${this.base_url}/score/add`, data)
      .pipe(
        catchError( err => of(err.error) )
      );
  }

}
