import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private isAuthenticated = false;
  userRole!: string;


  constructor() { }

//login function
  login(username: string, password: string): boolean {
   
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      return true;
    } else if (username === 'user' && password === 'user') {
      this.isAuthenticated = true;
      this.userRole = 'user';
      return true;
    }
    return false;
  }

  //logout

  logout(): void {
    this.isAuthenticated = false;

  }

  //Authentication for admin
  isAuthenticatedUser(): boolean {
    if(this.userRole=='admin'){
    return this.isAuthenticated;
  }
  return false;
  }


  //Authentication for user

  isAuthenticatedUser1():boolean{
    if(this.userRole=='user'){
      return this.isAuthenticated;
    }
    return false;
  }

  //to get the user role
  getUserRole(): string | null {
    return this.userRole;
  }
}
