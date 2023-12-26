import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpProfileService } from '../emp-profile.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';



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

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[EmpProfileService],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {

  http=inject(HttpClient);
  employee!: Employee;
   employeeId=5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmpProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //const employeeId = +params['id'];
    //  const employeeId= 4;
      this.loadEmployeeData(this.employeeId);
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

  editProfile(): void {
   
    this.router.navigate(['/employee-edit',this.employeeId]);
    console.log("ok")
  }

}
