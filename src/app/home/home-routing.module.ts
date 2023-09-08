import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'subject',
    loadChildren: () => import('../subject/subject.module').then(m => m.SubjectModule)
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
export class HomeRoutingModule { }
