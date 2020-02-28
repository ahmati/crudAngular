import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employees: any;

  employee: Employee = new Employee();
  submitted = false;
  employeeForm: any;
  employeeUpdate = false;
  pageType: any;
  Id;
  edit=false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private aroute: ActivatedRoute,
    ) {
    this.pageType = this.router.url.split('/')[1];
    if (this.pageType == "edit"){
      this.edit=true;
    }
    this.aroute.params.subscribe(data => {
      if (!!data && data.id) {
        this.Id = data.id;
        // this.loadEmployeeToEdit();
      }
    })

  }

  ngOnInit() {
    console.log(this.pageType);
    console.log(this.Id);
    this.employeeForm = this.formBuilder.group({
     
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      BirthDate: ['', [Validators.required]],
      HireDate: ['', [Validators.required]],
      City: ['', [Validators.required]],
    });

  }

  loadEmployeeToEdit() {
    this.employeeService.getEmployee(this.Id).subscribe(
      data =>{ 
      
      //   {this.employeeForm=this.formBuilder.group({
      // FirstName: [employee.FirstName, Validators.required],
      // LastName: [employee.LastName, [Validators.required]],
      // Title: [employee.Title, [Validators.required]],
      // BirthDate: [employee.BirthDate, [Validators.required]],
      // HireDate: [employee.HireDate, [Validators.required]],
      // City: [employee.City, [Validators.required]],

      this.employeeForm.controls['FirstName'].setValue(data.FirstName);
      this.employeeForm.controls['LastName'].setValue(data.LastName);
      this.employeeForm.controls['Title'].setValue(data.Title);
      this.employeeForm.controls['BirthDate'].setValue(data.BirthDate);
      this.employeeForm.controls['HireDate'].setValue(data.HireDate);
      this.employeeForm.controls['City'].setValue(data.City);
  
      },
    error => console.log(error))

  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  onSubmit() {
    const empId = this.employee.EmployeeId;
    if (this.pageType == "add") {
      this.add();
    }
    else if (this.pageType == "edit") { 

      this.update();
    }

  }

  add() {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value)
        .subscribe(data => console.log(data), error => console.log(error));
      this.employee = new Employee();
      this.gotoList();
    }
  }

  update() {
    // this.loadEmployeeToEdit();
    
    this.employeeForm.EmployeeId = this.Id;
    console.log( this.employeeForm.EmployeeId);
    this.employeeService.updateEmployee(this.Id,this.employeeForm.value)
      .subscribe(data => console.log(data), error => console.log(error));

  }



  gotoList() {
    this.router.navigate(['/employees']);
  }

  goBack() {
    this.location.back();
  }

}
