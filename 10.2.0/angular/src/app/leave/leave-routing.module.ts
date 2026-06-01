import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaveComponent } from './leave.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveRoutingModule {}