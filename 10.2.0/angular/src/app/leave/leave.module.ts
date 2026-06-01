import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeaveRoutingModule } from './leave-routing.module';

import { LeaveComponent } from './leave.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveRoutingModule,LeaveComponent,
    CreateComponent,
    EditComponent
  ]
})
export class LeaveModule { }