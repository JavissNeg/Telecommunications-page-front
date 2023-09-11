import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SendCodeResponse } from '../interfaces/whatsapp.interface';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor( private html: HttpClient ) { }
  
  base_url: string = environment.base_url;
  
  sendCode( phone: string ): Observable<SendCodeResponse> {
    return this.html.post<SendCodeResponse>(
      `${this.base_url}/whatsapp/send`, 
      { phone }
    );
  }

}
