import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm!: FormGroup;
  error_message: string = '';

  constructor( public fb: FormBuilder, public router: Router, private loginService: LoginService ) { }


  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: [
        '', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
      ],
      password: [
        '', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ]
    });
  }

  checkError( idError: string, controlInput: string ): boolean {
    const htmlElement = document.getElementById(idError);
    const htmlControlInput = this.loginForm.controls[controlInput]
    
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
            
          }

        }
      }

    }
    
    return false;
  }

  login(): void {
    this.loginService.auth( this.loginForm.value ).subscribe( res => {
      if ( res.success ) {
        this.loginService.logged_in(this.loginForm.value.username);
      } else {
        this.error_message = 'Nombre de usuario o contraseña incorrectos';

        setTimeout(() => {
          this.error_message = '';
        }, 3000);
      }
    });
  }

  goLink(link: string): void {
    this.router.navigateByUrl(link);
  }
}
