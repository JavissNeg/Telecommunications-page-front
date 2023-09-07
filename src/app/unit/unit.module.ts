import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { StartComponent } from './pages/start/start.component';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule
  ]
})
export class UnitModule { }
