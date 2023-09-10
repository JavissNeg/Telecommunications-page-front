import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './pages/subject/subject.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UnitService } from './services/unit.service';


@NgModule({
  declarations: [
    SubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ UnitService ],
})
export class SubjectModule { }
