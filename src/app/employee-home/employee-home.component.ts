import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OtherService } from '../other.service';
import { Router } from 'express';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[OtherService],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.scss'
})
export class EmployeeHomeComponent {
  /*notifications: any[] = [];

  http=inject(HttpClient);

  constructor(private employeeService: OtherService,private routes:Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees() {
    this.employeeService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }*/
}
