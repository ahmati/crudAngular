import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeByIdComponent } from './employee-by-id/employee-by-id.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import {EmployeeService} from './services/employee.service';
import { NewCComponent } from './new/new-c/new-c.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AgmCoreModule} from '@agm/core';
import {ChatDialogComponent} from './chat/chat-dialog/chat-dialog.component';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeByIdComponent,
    EmployeeEditComponent,
    NewCComponent,
    ChatDialogComponent

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBtm19RUNEDdNXx4-Hu2b4O-ed2uAokgjU"
    })
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
