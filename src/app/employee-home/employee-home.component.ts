import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OtherService } from '../other.service';
import { Router } from 'express';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[OtherService,LoginServiceService],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.scss'
})
export class EmployeeHomeComponent {
http=inject(HttpClient);
}
