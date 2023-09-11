import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  {
    path: ':subject_id',
    component: SubjectComponent
  },
  {
    path: 'test',
    loadChildren: () => import('../test/test.module').then(m => m.TestModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SubjectRoutingModule { }
