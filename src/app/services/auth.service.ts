import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';

import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore) { }


  /**
   * @description This method sholud be called in the app.component
   */
  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
    });
  }
  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {

        /**
         * When user is created in firebase auth table, we need to create the entry
         * in the angular fire db throught angular firestore service
         */

        const user: User = {
          name,
          email: res.user.email,
          uid: res.user.uid
        };

        /**
         * Creating the entry in the firebase db table...
         */
        this.afDB
          .doc(`${user.uid}/usuario`)
          .set( user )
          .then(() => {
            this.router.navigate(['/']);
          });
      })
      .catch(err => {
        Swal.fire('Register Error', err.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire('Login Error', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  /**
   * @description This method return A boolean observable,
   * using a map to return the value based on the authState object.
   * This method is used in the canActivate method of the AuthGuardService
   */
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser !== null;
      })
    );
  }
}
