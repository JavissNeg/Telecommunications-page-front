import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { QuestionResponse } from '../../interfaces/question.interfaces';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor( public http: HttpClient ) { }

  base_url = environment.base_url;

  getQuestionsByUnit( unit_id: string ): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${this.base_url}/question/${unit_id}`)
      .pipe(
        catchError( err => of(err.error) )
      );
  }

}
