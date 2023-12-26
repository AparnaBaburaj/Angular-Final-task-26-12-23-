import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import {Chart, ChartOptions} from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OtherService } from '../other.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[OtherService],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

  doughnutChart: any;
  barChart: any;

  employee_leaves: any[] = [];
  http=inject(HttpClient);
  constructor(private employeeService: OtherService,private route: ActivatedRoute,) {}

  ngOnInit() {
    this.createDoughnutChart();
    this.createBarChart();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getLeaveApplications().subscribe((data) => {
      this.employee_leaves = data;
      console.log(data);
    });
  }
  approveLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Approved').subscribe(() => {
      this.loadEmployees();
    
    });
  }

  rejectLeave(employeeId: number) {
    this.employeeService.updateLeaveStatus(employeeId, 'Rejected').subscribe(() => {
      this.loadEmployees();
    });
  }

  createDoughnutChart() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Active Employees', 'Inactive Employees'],
        datasets: [{
          data: [70,30],
          backgroundColor: ['rgba(0,0,0, 0.8)', 'rgba(84, 81, 81, 0.5)'],
          borderWidth: 1,
       
        }]
      },
    });
    
  
  }
 

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5'],
        datasets: [{
          label: 'Total Leaves Taken',
          data: [10, 5, 8, 12, 7], // Example data: replace with actual leave data
          backgroundColor: 'rgba(84, 81, 81,0.7)',
          borderColor: 'rgba(0,0,0, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
