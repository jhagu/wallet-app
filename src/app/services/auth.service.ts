import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import Swal from 'sweetalert2';

import { User } from '../models/user.model';
import * as fromUIActions from '../root-store/ui/ui.actions';
import * as fromAuthActions from '../root-store/auth/auth.actions';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // The subscription initialization handles undefined values when someone try to access to
  // the dashboard in non secure way
  private userSubscription: Subscription = new Subscription();
  private currentUser: User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  /**
   * @description This method sholud be called in the app.component
   */
  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if (fbUser) { //  If the user exists in firebase auth table...
        //  Go to obtain th e user obejct in firestore db via the fbUser.uid
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/user`).valueChanges().subscribe((dbLoguedUser: any) => {
          const loguedUser = new User(dbLoguedUser);
          this.store.dispatch(new fromAuthActions.SetLoguedUserAction(loguedUser));
          this.currentUser = loguedUser;
        });
      } else {
        this.currentUser = null;
        this.userSubscription.unsubscribe();
      }
    });
  }
  createUser(name: string, email: string, password: string) {
    //  Dispatch ACTIVATE_LOADING action
    this.store.dispatch(new fromUIActions.ActivateLoadingAction());

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
          .doc(`${user.uid}/user`)
          .set( user )
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
          });
      })
      .catch(err => {
        this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
        Swal.fire('Register Error', err.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new fromUIActions.ActivateLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
        Swal.fire('Login Error', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new fromAuthActions.UnsetUser());
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

  getCurrentUser() {
    return { ...this.currentUser };
  }
}
