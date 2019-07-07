import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthServices {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.loginSuccessfully();
  }
  
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.loginSuccessfully();
  }

  logout() {
    this.user = null;
    this.logoutSuccessfully();
  }
  getUser() {
    return { ...this.user }
  }
  isAuth() {
    return this.user != null;
  }

  private loginSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/console/checks'])
  }
  private logoutSuccessfully() {
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }
}