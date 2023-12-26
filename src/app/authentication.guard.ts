import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { OtherService } from './other.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const service=inject(LoginServiceService);
  //const service1=inject(OtherService);
  const router=inject(Router);

if (service.isAuthenticatedUser()) {
  return true;
} 
else if(service.isAuthenticatedUser1()){
  return true;
}

else {
  // Redirect to the login page if not authenticated
  return false;
}

};
