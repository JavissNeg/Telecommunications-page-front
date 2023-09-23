import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { RegisterRequest } from 'src/app/user/interfaces/register.interface';
import { SendCode } from 'src/app/user/interfaces/whatsapp.interface';
import { RegisterService } from 'src/app/user/services/register.service';
import { VerificationService } from 'src/app/user/services/verification.service';

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
  attemptsMax: number = 6;
  attemptsCounter: number = 0;
  
  constructor( 
    private loginService: LoginService,
    private registerService: RegisterService,
    private verificationService: VerificationService,
  ) { }

  ngOnInit(): void {
    document.getElementById('0')?.focus();
  }
  
  ngOnDestroy(): void {
    this.reset();
  }

  changeBox( id: number, event: KeyboardEvent ): void {

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
    
    if ( this.attemptsCounter < this.attemptsMax ) {

      if ( this.sendCodeResponse.verificationCode == this.code_digits.join('') ) {

        this.registerService.createUser( this.dataRegister ).subscribe( res => {
          
          if ( res.success ) {
            this.info_message = 'Se ha registrado correctamente';
            this.code_status = true;
          } else {
            this.info_message = res.message;
          }
  
        });
        
      } else {

        this.attemptsCounter++;
        this.info_message = 'El código de verificación es incorrecto' +
          '\nTe quedan ' + (this.attemptsMax - this.attemptsCounter) + ' intentos'; 
        
      }

    } else {
      
      if ( !localStorage.getItem('block_date') ) {
        this.verificationService.blockUser();
      }
      
      this.info_message = 'Ha superado el número de intentos permitidos, vuelve a intentarlo en 30 minutos';
    
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
      this.loginService.logged_in( this.dataRegister.username );
    } else {
      this.showInfo = showInfo;
      this.show = !showInfo;
      this.reset();
    }
  }

}
