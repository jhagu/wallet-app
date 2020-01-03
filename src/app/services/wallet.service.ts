import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WalletItem } from '../models/walletItem.model';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';

import * as fromWalletActions from '../root-store/wallet/wallet.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletListenerSubscription: Subscription = new Subscription();
  walletItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>) { }

  /**
   * @description This method listen any change in the items collection that belongs
   * to the current logued user. It should be called when the user is logued, so logically
   * we can call this method in the dashboard component.
   */
  initWalletListener() {
    //  1- Log the user uid, from the store!!
    //  We use pipe() to filter the value of the user, if null we ingnored
    //  2- We use a private method that return all the items from the db
    this.walletListenerSubscription =
    this.store
      .select('auth')
      .pipe(
        filter( auth => auth.user !== null))
      .subscribe( auth => {
        this.getWalletItems(auth.user.uid);
    });
  }

  private getWalletItems(uid: string) {
    this.walletItemsSubscription =
    this.afDB
      .collection(`${uid}/wallet/items`)
      .snapshotChanges()
      .pipe(map( docData => {
          return docData.map( (doc: any) => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((collection: any[]) => {
        // Update the store
        this.store.dispatch( new fromWalletActions.SetWalletItemsAction(collection));
      });
  }
  createWalletItem(walletItem: WalletItem) {
    const currentUser = this.authService.getCurrentUser();
    return this.afDB
      .doc(`${currentUser.uid}/wallet`)
      .collection('items')
      .add({...walletItem})
      .catch(err => {
        console.log(err);
      });
  }

  deleteItem(uid: string) {
    const currentUser = this.authService.getCurrentUser();

    return this.afDB
      .doc(`${currentUser.uid}/wallet/items/${uid}`)
      .delete();
  }

  /**
   * @description This method should be called after a logout
   */
  cancelSubscriptions() {
    this.walletItemsSubscription.unsubscribe();
    this.walletListenerSubscription.unsubscribe();
    this.store.dispatch(new fromWalletActions.UnsetWalletItemsAction());
  }
}
