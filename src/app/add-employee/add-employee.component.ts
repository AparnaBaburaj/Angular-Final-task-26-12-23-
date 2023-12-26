import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule, } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { OtherService } from '../other.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule,RouterOutlet,HttpClientModule],
  providers:[OtherService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

  employeeForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;

  http=inject(HttpClient);

  constructor(private fb: FormBuilder,private leaveService: OtherService) { }

  ngOnInit(): void {

    const randomPassword = this.generateRandomPassword();
    var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; 
    var regPhone=/^\d{10}$/; 
    this.employeeForm = this.fb.group({
      role: ['', Validators.required],
      emp_id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      image: [''],
      bloodGroup: [''],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password:randomPassword,
     
     
    });
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.employeeForm.patchValue({ image: file });
    this.employeeForm.get('image')?.setValue(file);
    console.log("image",file);
  }
  /*onFileChange(event: any): void {
    const file = event.target.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
  
      this.employeeForm.get('image')?.setValue(file);
    }
  
  }*/

  async onSubmit(): Promise<void> {
    if (this.employeeForm.valid) {
      const result = await this.showDeleteConfirmation();
      if (result.isConfirmed) {
        Swal.fire('Added!', 'New Employee Added.', 'success');
        const leaveApplication = this.employeeForm.value;
        this.leaveService.addEmployee(leaveApplication).subscribe(
          (response: any) => {
            console.log('Employee added successfully:', leaveApplication);
            this.resetForm();
          },
          (error: any) => {
            console.error('Error submitting the form:', error);
          }
        );  console.log('Employee Added:', leaveApplication);
      }
  
    }
  }
  private resetForm(): void {
    this.employeeForm.reset();
    this.previewImage = null;
  }
  private showDeleteConfirmation(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add it!'
    });
  }

  canDeactivate(): boolean {
    if (this.isFormDirty()) {
      return window.confirm('Are you sure want to redirect');
    }
    return false;
  }

  private isFormDirty(): boolean {
    return (
      this.employeeForm.value !== ''
    
    );
  }

  private generateRandomPassword(): string {
    // Your logic to generate a random password (customize as needed)
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
  }

}
