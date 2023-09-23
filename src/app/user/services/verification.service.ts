import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor() { }

  blockUser(): void {
    const date = new Date();
    const block_date = date.getTime() + 1800000;
    localStorage.setItem('block_date', block_date.toString());
  }

  unBlockUser(): void {
    localStorage.removeItem('block_date');
  }

}
