import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //Initialization
  username = '';
  password = '';

  constructor(private authService: LoginServiceService, private router:Router) {}


  //login fuction
  async login(): Promise<void> {
    if (this.authService.login(this.username, this.password)) {
      if (this.authService.getUserRole() === 'admin') {
        this.router.navigate(['/admin-home']);
      } else if (this.authService.getUserRole() === 'user'){
        this.router.navigate(['/employee-home']);
      }
    } else {
      const result = await this.showInvalidConfirmation();
      if (result.isConfirmed) {
        this.username='';
        this.password=''
        
      }
    }
  }


  private showInvalidConfirmation(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Invalid Credentials!!',
      text: 'Please check your username or password',
      icon: 'error',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#000000',
      confirmButtonText: 'Try Again'
    });
  }


}
