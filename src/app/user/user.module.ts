import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
