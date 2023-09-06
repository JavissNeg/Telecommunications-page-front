import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  showDialog: boolean = false;
  registerForm!: FormGroup;
  
  constructor( public readonly fb: FormBuilder, public router:Router ) { }
  
  ngOnInit(): void {
    this.registerForm = this.initForm();
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
        'Javier', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      lastname: [
        'Negrete', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]
      ],
      mail: [
        'negretbtino@hotmail.com', [Validators.required, Validators.email, Validators.maxLength(30)]
      ],
      phone: [
        '7297056530', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      username: [
        'Admin', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
      ],
      password: [
        '12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      password_confirmation: [
        '12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(20), validatePasswordMatch]
      ],
    });
  }
  
  save(): void {
    console.log(this.registerForm.value);
    console.log(this.registerForm.controls['phone'].value);
    

    this.showDialog = true;
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
