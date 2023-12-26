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

  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }
  isUserAuthenticated():boolean{
    return this.authService.isAuthenticatedUser1();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  form1(): void {
    //this.authService.logout();
    this.router.navigate(['/admin-home'])
  }
  form2(): void {
    //this.authService.logout();
    this.router.navigate(['/employee-details'])
  }
  
  form3(): void {
    //this.authService.logout();
    this.router.navigate(['/employee-add'])
  }
  form4(): void {
    //this.authService.logout();
    this.router.navigate(['/leave-apply'])
  }
  form5(): void {
    //this.authService.logout();
    this.router.navigate(['/employee-home'])
  }
  form6(): void {
    //this.authService.logout();
    this.router.navigate(['/employee-profile'])
  }
  form7(): void {
    //this.authService.logout();
    const employeeId=5;
    this.router.navigate(['/leave-details',employeeId]);
  }
}
