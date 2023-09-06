import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationCodeComponent } from './dialogs/verification-code/verification-code.component';
import { ButtonNextComponent } from './components/button-next/button-next.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    VerificationCodeComponent,
    ButtonNextComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
