import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { authenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DetailsEmployeeComponent } from './details-employee/details-employee.component';
import { deActivateGuard } from './de-activate.guard';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmpEditProfileComponent } from './emp-edit-profile/emp-edit-profile.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    {
      path: 'admin-home',
      component: AdminHomeComponent,
      canActivate: [authenticationGuard]
    },
    {
        path: 'employee-home',
        component: EmployeeHomeComponent,
        canActivate: [authenticationGuard]
      },
      {
        path: 'employee-add',
        component: AddEmployeeComponent,
        canDeactivate: [deActivateGuard],
        canActivate: [authenticationGuard]
       
      },
      {
        path: 'leave-details/:id',
        component: LeaveDetailsComponent,
        canActivate: [authenticationGuard]
      },
      {
        path: 'leave-apply',
        component: LeaveApplicationComponent,
        canDeactivate: [deActivateGuard],
        canActivate: [authenticationGuard]
      },
      {
        path: 'employee-details',
        component: DetailsEmployeeComponent,
        canActivate: [authenticationGuard]
      },

      {
        path: 'employee-profile',
        component: EmployeeProfileComponent,
        canActivate: [authenticationGuard]
      },
      {
        path: 'employee-edit/:id',
        component: EmpEditProfileComponent,
        canActivate: [authenticationGuard]
      },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
