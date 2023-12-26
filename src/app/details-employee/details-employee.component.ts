import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OtherService } from '../other.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-employee',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,RouterOutlet],
  providers:[OtherService],
  templateUrl: './details-employee.component.html',
  styleUrl: './details-employee.component.scss'
})
export class DetailsEmployeeComponent {

  employees: any[] = [];

  http=inject(HttpClient);

  constructor(private employeeService: OtherService,private routes:Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  viewLeaveDetails(employeeId: number) {
   // this.routes.navigate(['/leave-details',employeeId]);
   this.routes.navigate(['/leave-details',employeeId]);
}

editEmployee(employeeId:number) {
  // Implement logic to navigate or open an edit form for the selected employee
 // console.log(`Editing employee ${employeeId}`);
  this.routes.navigate(['/employee-edit',employeeId]);
}

  async deleteEmployee(employeeId:number) {
  // Implement logic to confirm deletion and delete the employee
  //const confirmDelete = confirm(`Delete ${employeeId}?`);
  const confirmDelete = await this.showDeleteConfirmation();
  //if (confirmDelete.isConfirmed) {
    
   
  if (confirmDelete.isConfirmed) {
    // Call a service method to delete the employee
    Swal.fire('Deleted!', 'Employee Deleted.', 'success');
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      // Optionally, refresh the employee list after deletion
      this.loadEmployees();
    });
  }

}
private showDeleteConfirmation(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete it!'
  });
}

}
