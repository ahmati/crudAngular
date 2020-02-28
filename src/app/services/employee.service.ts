import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private appUrl: "http://localhost:5000/api/employee/get/";

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'update/';
   }
   getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.appUrl}`);
  }

  getEmployee(id){
    return this.http.get<Employee>('http://localhost:5000/api/employee/get/' + id,this.httpOptions);
  }

  // getEmployee(empId: number): Observable<Employee> {
  //     return this.http.get<Employee>('http://localhost:5000/api/employee/get/' + empId)
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandler)
  //     );
  // }

  createEmployee(employee: Employee){
    return this.http.post<Employee>('http://localhost:5000/api/employee/create/', employee , this.httpOptions);
  }

  saveEmployee(blogPost): Observable<Employee> {
      return this.http.post<Employee>(this.myAppUrl + this.myApiUrl, JSON.stringify(blogPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEmployee(id:any,employee: Employee){
    // empId=employee.EmployeeId;
    return this.http.put<Employee>('http://localhost:5000/api/employee/update/' + id , employee, this.httpOptions);
  }

  // updateEmployee(postId: number, employee: Employee): Observable<Employee> {
  //     return this.http.put<Employee>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(employee), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandler)
  //     );
  // }

  deleteEmployee(postId) {
    return this.http.delete(`http://localhost:5000/api/employee/delete/${postId}`);
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
