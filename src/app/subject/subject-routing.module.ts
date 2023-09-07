import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  {
    path: ':id',
    component: SubjectComponent
  },
  {
    path: 'unit',
    loadChildren: () => import('../unit/unit.module').then(m => m.UnitModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SubjectRoutingModule { }
