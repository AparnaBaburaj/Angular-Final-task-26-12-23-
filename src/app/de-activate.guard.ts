import { CanDeactivateFn } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';

export const deActivateGuard: CanDeactivateFn<AddEmployeeComponent> = (component, currentRoute, currentState, nextState) => {

  component:AddEmployeeComponent;
  component: LeaveApplicationComponent
  if(component.canDeactivate()){
    //return window.confirm('Are you sure want to redirect');
    return true;
  }


return false
  
};
