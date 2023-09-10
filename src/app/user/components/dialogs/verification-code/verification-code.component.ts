import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/user/interfaces/register.interface';
import { CodeService } from 'src/app/user/services/code.service';
import { RegisterService } from 'src/app/user/services/register.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})

export class VerificationCodeComponent implements OnInit, OnDestroy {

  @Input() show!: boolean;
  @Input() dataRegister!: RegisterRequest;
  @Output() showVerificationEmmiter = new EventEmitter<boolean>();
  
  code_digits: string[] = ['', '', '', '', '', '']; 
  code_status: boolean = false;
  filledFields: boolean = false;

  showInfo: boolean = false;
  info_message: string = '';

  constructor( private router: Router, private registerService: RegisterService, private codeService: CodeService) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.code_digits = ['', '', '', '', '', '']; 
  }

  changeBox( id: number, event: KeyboardEvent ): void {

    if ( event.key && isNaN(Number(event.key)) ) {
      event.stopPropagation();
      this.code_digits[id] = '';
      return;
    }


    const result = this.code_digits.every( digit => digit.length > 0 );
    
    if (result) {
      this.filledFields = true;

    } else {
      this.filledFields = false;

      if (this.code_digits[id].length >= 1) {
        document.getElementById( String(id + 1) )?.focus();
      }
      
    }

  }

  verifyCode(): void {

    this.codeService.verifyCode( this.dataRegister.phone, this.code_digits.join('') ).subscribe( res => {
      
      if (res.success) {
        this.code_status = true;

        this.registerService.createUser( this.dataRegister ).subscribe( res => {
          this.info_message = res.message;
        });
        
      } else {
        this.info_message = res.message;      
      }

      this.show = false;
      this.showInfo = true;
    });

  }
  
  close(): void {
    this.filledFields = false;
    this.showVerificationEmmiter.emit(false);
  }

  closeInfo( showInfo: boolean ): void {
    if (this.code_status) {
      this.router.navigate(['/home']);
    } else {
      this.showInfo = showInfo;
      this.show = !showInfo;
    }
  }

}
