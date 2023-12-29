import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtherService } from '../other.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CommonModule, FormStyle } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-leave-application',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterOutlet,HttpClientModule,ReactiveFormsModule],
  providers:[OtherService,HttpClientModule,HttpClient,LoginServiceService],
  templateUrl: './leave-application.component.html',
  styleUrl: './leave-application.component.scss'
})
export class LeaveApplicationComponent {

  //Initialization
  http=inject(HttpClient);

  leaveForm!: FormGroup;

  constructor(private fb: FormBuilder,private leaveService: OtherService) { }

  ngOnInit(): void {
    const status='Pending'
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      leaveStatus: status,
    });
  }
  async onSubmit(): Promise<void> {
    if (this.leaveForm.valid) {
      const result = await this.showLeaveConfirmation();
      if (result.isConfirmed) {
        Swal.fire('Sent!', 'Leave Application Submitted.', 'success');
        const leaveApplication = this.leaveForm.value;
        this.leaveService.addLeaveApplication(leaveApplication).subscribe(
          (response: any) => {
            console.log('Leave application submitted successfully:', response);
            this.resetForm();
          },
          (error: any) => {
            console.error('Error submitting leave application:', error);
          }
        );  console.log('Leave submitted:', leaveApplication);
     }
    }
  }

  //reset the form after submission
  private resetForm(): void {
    this.leaveForm.reset();
  }
  private showLeaveConfirmation(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed it!'
    });
  }

  //Call deactivate guard
  canDeactivate(): boolean {
    if (this.isFormDirty()) {
      return window.confirm('Are you sure want to redirect');
    }
    return false;
  }

  private isFormDirty(): boolean {
    return (
      this.leaveForm.value !== ''
    
    );
  }


}
