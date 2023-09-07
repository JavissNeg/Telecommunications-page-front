import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { StartComponent } from './pages/start/start.component';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    UserModule,
    FormsModule
  ]
})
export class UnitModule { }
