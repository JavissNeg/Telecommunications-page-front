import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm!: FormGroup;

  constructor( public fb: FormBuilder, public router: Router ) { }


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

  login(): void {
    console.log(this.loginForm.value);
  }

  goLink(link: string): void {
    this.router.navigateByUrl(link);
  }
}
