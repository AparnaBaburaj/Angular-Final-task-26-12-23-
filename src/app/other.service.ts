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

  private apiUrl = 'http://localhost:3000';

  private empDetails: any[] = [];

  constructor(private http: HttpClient) {}

   //employee add
  addEmployee(data: Employee): Observable<any> {

    /*const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('image', data.image);
    formData.append('emp_id', data.emp_id);
    formData.append('age', data.age);
    formData.append('dob', data.dob);
    formData.append('bloodGroup', data.bloodGroup);
    formData.append('gender', data.gender);
    formData.append('email', data.email);
    formData.append('mobileNumber', data.mobileNumber);
    formData.append('password', data.password);*/
  
    return this.http.post(`${this.apiUrl}/employees`, data);
  }


 //To get All employee details
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }


  //leave application




  private leaveApplications: any[] = [];




  addLeaveApplication(data: any): Observable<any> {

     return this.http.post(`${this.apiUrl}/employee_leaves`, data);
  }

   //To get All leave details

  getLeaveApplications():  Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/employee_leaves/${employeeId}`);
    //const url = `${this.apiUrl}/employee_leaves`;
    const id=4;
    return this.http.get<any[]>(`${this.apiUrl}/employee_leaves?`);
  }

 
  getLeaveApplicationsbyUser(employeeId: number): Observable<Leave[]> {
   // return this.http.get<any[]>(`${this.apiUrl}/employee_leaves/${employeeId}`);
   //const url = `${this.apiUrl}/employee_leaves/${employeeId}`;
   //return this.http.get<Leave[]>(url);
   return this.http.get<any[]>(`${this.apiUrl}/employee_leaves?id=${employeeId}`);
  
    
  }


  //Update leave status
  updateLeaveStatus(employeeId: number, status: string): Observable<any> {
    const body = { leaveStatus: status };
    return this.http.patch(`${this.apiUrl}/employee_leaves/${employeeId}`, body);
  }


 //Delete Employee leave status

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${employeeId}`);
  }


  getEmployeeById(employeeId: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/employees/${employeeId}`);
  }

  getLeavesById(employeeId: number): Observable<any> {
    return this.http.get<void>(`${this.apiUrl}/employee_leaves/${employeeId}`);
  }

  updateEmployee(employeeId: number, updatedEmployee: String): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/employees/${employeeId}`, updatedEmployee);
  }

}
