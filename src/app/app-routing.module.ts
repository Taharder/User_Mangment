import { createComponentDefinitionMap } from '@angular/compiler/src/render3/partial/component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { usersComponent } from './Users/users.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'newuser',
    component: CreateComponent,
  },
  {
    path:'home',
    component: usersComponent
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'updateuser/:id',
    component:UpdateComponent
  },
  {
    path:'user/:id',
    component:DetailComponent

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
