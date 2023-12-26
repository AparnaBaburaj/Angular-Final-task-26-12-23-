import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OtherService } from '../other.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

export interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  leaveType:string;
  reason:string;
  leaveStatus:string;
  // Add more properties as needed
}


@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,RouterOutlet],
  providers:[OtherService],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss'
})
export class LeaveDetailsComponent {
 employee_leaves: any[] = [];
  http=inject(HttpClient);
 // employee_leaves!: Leave[];
  

  constructor(private employeeService: OtherService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    //this.loadEmployees();
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      //const employeeId=4;
      this.loadEmployees(employeeId);
    });
    
  }
  /*loadEmployees() {
    this.employeeService.getLeaveApplications().subscribe((data) => {
      this.employee_leaves = data;
      console.log(data);
    });
  }*/

   loadEmployees(employeeId:number): void {
    this.employeeService.getLeaveApplicationsbyUser(employeeId).subscribe((data)  => {
      this.employee_leaves = data;
      console.log("data:",data);
    });
  }
  

  approveLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Approved').subscribe(() => {
      this.loadEmployees(employeeId);
    
    });
  }

  rejectLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Rejected').subscribe(() => {
      this.loadEmployees(employeeId);
    });
  }
 /* employeeId!: number;
  leaveDetails!: Leave[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: OtherService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.loadLeaveDetails();
    });
  }

  loadLeaveDetails(): void {
    this.employeeService.getLeaveApplicationsbyUser(this.employeeId).subscribe(
      (leaveDetails) => {
        console.log("id:",this.employeeId);
        leaveDetails =leaveDetails;
       
      },
      (error) => {
        console.error('Error loading leave details', error);
      }
    );
  }

  approveLeave(leaveId: number): void {
    // Implement logic to update leave status as "approved"
    console.log(`Leave ${leaveId} approved.`);
  }

  rejectLeave(leaveId: number): void {
    // Implement logic to update leave status as "rejected"
    console.log(`Leave ${leaveId} rejected.`);
  }*/
}