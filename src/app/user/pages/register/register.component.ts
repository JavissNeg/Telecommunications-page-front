import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/register.interface';
import { WhatsappService } from '../../services/whatsapp.service';
import { SendCode } from '../../interfaces/whatsapp.interface';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  showDialog: boolean = false;
  registerForm!: FormGroup;
  register!: RegisterRequest;
  sendCodeResponse!: SendCode;
  
  constructor( public readonly fb: FormBuilder, public router:Router, 
    public whatsappService: WhatsappService, private verificationService: VerificationService ) { }
  
  ngOnInit(): void {
    this.registerForm = this.initForm();
  }

  ngOnDestroy(): void {
    this.registerForm.reset();
  }

  initForm(): FormGroup {
    function validatePasswordMatch(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.parent?.get('password')?.value;
      const password_confirmation = control?.value;
      
      if (password === password_confirmation) {
        return null;
      } else {
        return { passwordMatch: true };
      }
    }

    return this.fb.group({
      name: [
        '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      lastname: [
        '', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]
      ],
      mail: [
        '', [Validators.required, Validators.email, Validators.maxLength(50)]
      ],
      phone: [
        '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      username: [
        '', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
      ],
      password: [
        '', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      password_confirmation: [
        '', [Validators.required, Validators.minLength(8), Validators.maxLength(20), validatePasswordMatch]
      ],
    });
  }
  
  save(): void {
    if (this.registerForm.valid) {
      
      this.register = {
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value,
        name: this.registerForm.controls['name'].value,
        lastname: this.registerForm.controls['lastname'].value,
        mail: this.registerForm.controls['mail'].value,
        phone: this.registerForm.controls['phone'].value,
      }
      
      const phone = this.registerForm.controls['phone'].value;
      const date = new Date();
      const actual_date = date.getTime();
      const block_date = Number.parseInt( localStorage.getItem('block_date') || date.getTime().toString() );

      if ( block_date <= actual_date ) {
        
        this.verificationService.unBlockUser();
        this.whatsappService.sendCode( phone ).subscribe( res => {
        
          if (res.success ) { 
            this.sendCodeResponse = res.data;
            this.showDialog = true 
          } 
        });

      }
    
    }
  }

  checkError( idError: string, controlInput: string ): boolean {
    const htmlElement = document.getElementById(idError);
    const htmlControlInput = this.registerForm.controls[controlInput]
    
    if (htmlElement) {

      if ( htmlControlInput.hasError('required') ) {
        htmlElement.textContent = 'Este campo es obligatorio';
        return true;

      } else {
        if ( htmlControlInput.hasError('minlength') ) {
          const minLength = htmlControlInput.errors?.['minlength']?.requiredLength;
          htmlElement.textContent = `Este campo debe tener al menos ${minLength} caracteres`;
          return true;

        } else {
          if ( htmlControlInput.hasError('maxlength') ) {
            const maxLength = htmlControlInput.errors?.['maxlength']?.requiredLength;
            htmlElement.textContent = `Este campo debe tener menos de ${maxLength} caracteres`;
            return true;
            
          } else {
            if (htmlControlInput.hasError('email')) {
              htmlElement.textContent = 'El correo electrónico no es válido';
              return true;
            } else {
              if (htmlControlInput.hasError('passwordMatch')) {
                htmlElement.textContent = 'Las contraseñas ingresadas no coinciden';
                return true;
              } else { return false; }
            }
          }
        }
      }

    }
    
    return false;
  }
  
  goLink(link: string): void {
    this.router.navigateByUrl(link);
  }

}
