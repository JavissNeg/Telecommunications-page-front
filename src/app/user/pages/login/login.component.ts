import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss']
})

export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;

  constructor( public fb: FormBuilder ) { }
  ngOnInit(): void {
    this.loginForm = this.initForm();
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

}
