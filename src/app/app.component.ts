import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final-task';


  constructor(private authService: LoginServiceService,private router:Router) {}

  
    //Load Admin dashboard
  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }
    //Load User dashboard
  isUserAuthenticated():boolean{
    return this.authService.isAuthenticatedUser1();
  }

    //For logging out
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

    //Navigate to admin home
  form1(): void {
   
    this.router.navigate(['/admin-home'])
  }

    //Navigate to employee details
  form2(): void {
   
    this.router.navigate(['/employee-details'])
  }

    //Navigate to add employee page
  form3(): void {
   
    this.router.navigate(['/employee-add'])
  }

    //Navigate to leave application
  form4(): void {
   
    this.router.navigate(['/leave-apply'])
  }

    //Navigate to employee home
  form5(): void {
    
    this.router.navigate(['/employee-home'])
  }

    //Navigate to employee profile
  form6(): void {
  
    this.router.navigate(['/employee-profile'])
  }

    //Navigate to leave details
  form7(): void {
    const employeeId=5;
    this.router.navigate(['/leave-details',employeeId]);
  }
}
