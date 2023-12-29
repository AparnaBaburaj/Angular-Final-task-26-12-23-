import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  leaveType:string;
  reason:string;
  leaveStatus:string;
  // Add more properties as needed
}

export interface Employee {
  name: string;
  role: string;    
  image: File;
  emp_id:string;
  age:string;
  dob:string;
  bloodGroup:string;
  gender:string;
  email:string;
  mobileNumber:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class OtherService {


  //Initialization

  private apiUrl = 'http://localhost:3000';

  private empDetails: any[] = [];

  constructor(private http: HttpClient) {}



   //employee add
  addEmployee(data: Employee): Observable<any> {

    return this.http.post(`${this.apiUrl}/employees`, data);

  }


 //To get All employee details
  getEmployees(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/employees`);

  }


  //leave application
  addLeaveApplication(data: any): Observable<any> {

     return this.http.post(`${this.apiUrl}/employee_leaves`, data);

  }

   //To get All leave details

  getLeaveApplications():  Observable<any[]> {
   
    const id=4;
    return this.http.get<any[]>(`${this.apiUrl}/employee_leaves?`);
  }

    //To get All leave details by user
  getLeaveApplicationsbyUser(employeeId: number): Observable<Leave[]> {

   return this.http.get<any[]>(`${this.apiUrl}/employee_leaves?id=${employeeId}`);
  
    
  }


  //Update leave status
  updateLeaveStatus(employeeId: number, status: string): Observable<any> {
    const body = { leaveStatus: status };
    return this.http.patch(`${this.apiUrl}/employee_leaves/${employeeId}`, body);
  }


 //Delete Employee 

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${employeeId}`);
  }

   //To get employee details by user
  getEmployeeById(employeeId: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/employees/${employeeId}`);
  }

  getLeavesById(employeeId: number): Observable<any> {
    return this.http.get<void>(`${this.apiUrl}/employee_leaves/${employeeId}`);
  }
   //To update employee profile
  updateEmployee(employeeId: number, updatedEmployee: String): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/employees/${employeeId}`, updatedEmployee);
  }

}
