import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeByIdComponent} from './employee-by-id/employee-by-id.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {ChatDialogComponent} from './chat/chat-dialog/chat-dialog.component';

const routes: Routes = [
  {path: '', component: EmployeeListComponent, pathMatch: 'full'},
  {path: 'employee/:id', component: EmployeeByIdComponent},
  {path: 'add', component: EmployeeEditComponent},
  {path: 'edit/:id', component: EmployeeEditComponent},
  {path: 'chat', component: ChatDialogComponent},
  {path: '**', redirectTo: '/'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

