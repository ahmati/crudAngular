import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // employees$: Observable<Employee[]>;
  employees: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient , 
    private employeeService: EmployeeService) { }

  ngOnInit() {
    //  this.loadEmployees();
    this.spinner.show();
    this.http.get("http://localhost:5000/api/employee/get").subscribe(
    data => {this.employees=data});
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
}

  loadEmployees(){
    this.employees = this.employeeService.getEmployees();
  }

  delete(employeeId) {
     const ans = confirm('Do you want to delete blog post with id: ' + employeeId);
    if(ans){
      this.employeeService.deleteEmployee(employeeId).subscribe((data) => {
        console.log(data);
        this.http.get("http://localhost:5000/api/employee/get").subscribe(
      data => {this.employees=data});
      }); 
    }
  }

  trackByFn(employee): string{
    return employee.id;

  }
}
