import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore } from 'angularfire2/firestore';
import { CheckService } from '../console/checks/check/check.service';

@Injectable()

export class AuthServices {
  private user: User;
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private checkService: CheckService
  ) {}
  
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = { email: user.email, userId: user.uid }
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/console/checks'])
      } else {
        this.checkService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next()
        this.user = null;
        this.router.navigate(['/signup'])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.db.collection('users')
          .doc(res.user.uid)
          .set({
            email: res.user.email,
          })
          .then(()=>console.log('Set new user'))
          .catch((error)=>console.log(error))
      })
      .catch(err => console.log(err));
  }
  
  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => console.log(res.user.uid))
      .catch(err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  getUser() {
    return { ...this.user }
  }
  isAuth() {
    return this.isAuthenticated;
  }
  // private loginSuccessfully() {
    
  // }
  // private logoutSuccessfully() {
  //   this.isAuthenticated = false;
  //   this.authChange.next(false);
  //   this.router.navigate(['/login'])
  // }
}