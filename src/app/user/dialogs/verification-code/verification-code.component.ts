import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})

export class VerificationCodeComponent implements OnInit, OnDestroy {

  @Input() phone!: string;
  @Input() show!: boolean;
  @Output() showEmmiter = new EventEmitter<boolean>();
  
  code: string[] = ['', '', '', '', '', '']; 
  filledFields: boolean = false;
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.code = ['', '', '', '', '', '']; 
  }

  changeBox( id: number, event: KeyboardEvent ): void {

    if ( event.key && isNaN(Number(event.key)) ) {
      event.stopPropagation();
      this.code[id] = '';
      return;
    }


    const result = this.code.every( digit => digit.length > 0 );
    
    if (result) {
      this.filledFields = true;

    } else {
      this.filledFields = false;

      if (this.code[id].length >= 1) {
        document.getElementById( String(id + 1) )?.focus();
      }
      
    }

  }

  verifyCode(): void {
    const union = this.code.join('');
    console.log(union);
  }

  close(): void {
    this.ngOnDestroy();
    this.showEmmiter.emit(false);
  }
}
