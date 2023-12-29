import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Employee {
  role: string;
  id: number;
  name: string;
  image: string;
  age:number;
  dob:string;
  email:string;
  mobileNumber:string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpProfileService {



  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

     //To get employee details by id

  getEmployeeById(employeeId: number): Observable<Employee> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<Employee>(url);
  }
   //update employee pofile
  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }
}
