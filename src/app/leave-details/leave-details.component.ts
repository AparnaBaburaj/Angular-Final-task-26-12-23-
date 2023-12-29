import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OtherService } from '../other.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

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

  

  constructor(private employeeService: OtherService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      
      this.loadEmployees(employeeId);
    });
    
  }

  //Load leave details

   loadEmployees(employeeId:number): void {
    this.employeeService.getLeaveApplicationsbyUser(employeeId).subscribe((data)  => {
      this.employee_leaves = data;
      console.log("data:",data);
    });
  }
  

   // upadate status when clicking approved
  approveLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Approved').subscribe(() => {
      Swal.fire('Approved!', 'Leave Approved', 'success');
      this.loadEmployees(employeeId);
    
    });
  }

   // upadate status when clicking rejected
  rejectLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Rejected').subscribe(() => {
      Swal.fire('Rejected!', 'Leave Rejected', 'success');
      this.loadEmployees(employeeId);

    });
  }
 
}