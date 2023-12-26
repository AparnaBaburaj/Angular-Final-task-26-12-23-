import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private isAuthenticated = false;
  userRole!: string;


  constructor() { }


  login(username: string, password: string): boolean {
    // Your authentication logic here
    // For simplicity, let's use a basic username and password check
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


  logout(): void {
    this.isAuthenticated = false;
  
    //this.userRole = null;
  }

  isAuthenticatedUser(): boolean {
    if(this.userRole=='admin'){
    return this.isAuthenticated;
  }
  return false;
  }
  isAuthenticatedUser1():boolean{
    if(this.userRole=='user'){
      return this.isAuthenticated;
    }
    return false;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}
