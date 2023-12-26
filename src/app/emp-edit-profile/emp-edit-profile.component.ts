import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpProfileService } from '../emp-profile.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


interface Employee {
  id: number;
  role: string;
  
  name: string;
  image: string;
  age:number;
  dob:string;
  email:string;
  mobileNumber:string;

}


@Component({
  selector: 'app-emp-edit-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  providers:[EmpProfileService],
  templateUrl: './emp-edit-profile.component.html',
  styleUrl: './emp-edit-profile.component.scss'
})
export class EmpEditProfileComponent {

  employee!: Employee;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmpProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      //const employeeId=4;
      this.loadEmployeeData(employeeId);

      
    });
  }

  private loadEmployeeData(employeeId: number): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee: Employee) => {
        this.employee = employee;
      },
      error => {
        console.error('Error loading employee data', error);
      }
    );
  }

  saveChanges(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(
      updatedEmployee => {

        Swal.fire('Updated!', 'Your Profile Updated', 'success');
        
        console.log('Employee updated successfully', updatedEmployee);
      
      },
      error => {
        console.error('Error updating employee', error);
      }
    );
  }

}
