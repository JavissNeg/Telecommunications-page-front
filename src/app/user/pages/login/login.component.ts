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

  login(): void {
    this.loginService.auth(this.loginForm.value).subscribe( res => {
      if ( res.success ) {
        this.loginService.logged_in(this.loginForm.value.username);
      }
    });
  }

  goLink(link: string): void {
    this.router.navigateByUrl(link);
  }
}
