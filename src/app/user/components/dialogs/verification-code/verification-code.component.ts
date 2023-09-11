import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/user/interfaces/register.interface';
import { SendCode } from 'src/app/user/interfaces/whatsapp.interface';
import { LoginService } from 'src/app/user/services/login.service';
import { RegisterService } from 'src/app/user/services/register.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})

export class VerificationCodeComponent implements OnInit, OnDestroy {

  @Input() show!: boolean;
  @Input() dataRegister!: RegisterRequest;
  @Input() sendCodeResponse!: SendCode;
  @Output() showVerificationEmmiter = new EventEmitter<boolean>();
  
  code_digits: string[] = ['', '', '', '', '', '']; 
  code_status: boolean = false;
  filledFields: boolean = false;

  showInfo: boolean = false;
  info_message: string = '';

  constructor( 
    private router: Router, private loginService: LoginService,
    private registerService: RegisterService 
  ) { }

  ngOnInit(): void {
    document.getElementById('0')?.focus();
  }
  
  ngOnDestroy(): void {
    this.reset();
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
    
    if ( this.sendCodeResponse.verificationCode == this.code_digits.join('') ) {
      this.code_status = true;
      
      this.registerService.createUser( this.dataRegister ).subscribe( res => {
        this.loginService.logged_in( this.dataRegister.username );
        this.info_message = 'Se ha registrado correctamente';
      });
      
    } else {
      this.info_message = 'El código de verificación es incorrecto';  

    }

    this.show = false;
    this.showInfo = true;

  }
  
  close(): void {
    this.filledFields = false;
    this.showVerificationEmmiter.emit(false);
  }
  
  reset(): void {
    this.code_digits = ['', '', '', '', '', '']; 
    this.filledFields = false;
  }

  closeInfo( showInfo: boolean ): void {
    if (this.code_status) {
      this.router.navigate(['/home']);
    } else {
      this.showInfo = showInfo;
      this.show = !showInfo;
      this.reset();
    }
  }

}
