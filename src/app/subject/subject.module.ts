import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './pages/subject/subject.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


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
})
export class SubjectModule { }
