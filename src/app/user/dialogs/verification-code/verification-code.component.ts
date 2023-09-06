import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})

export class VerificationCodeComponent implements OnInit {
  
  @Input() phone!: string;
  @Input() show!: boolean;
  
  code: string[] = ['', '', '', '', '', '']; 
  codeValid: boolean = false;

  ngOnInit(): void {
  }

  changeBox( id: number, event: KeyboardEvent ): void {

    if ( event.key && isNaN(Number(event.key)) ) {
      event.stopPropagation();
      this.code[id] = '';
      return;
    }


    const result = this.code.every( digit => digit.length > 0 );
    
    if (result) {
      this.codeValid = true;
    } else {
      this.codeValid = false;
      if (this.code[id].length >= 1) {
        document.getElementById( String(id + 1) )?.focus();
      }
    }

  }

  verifyCode(): void {
    console.log(this.code);
    
  }

  close(): void {
    console.log('close');
    
    this.show = false;
  }
}
