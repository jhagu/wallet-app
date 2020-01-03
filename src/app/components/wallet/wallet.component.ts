import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WalletItem } from '../../models/walletItem.model';
import { WalletService } from '../../services/wallet.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as fromUIActions from '../../root-store/ui/ui.actions';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styles: []
})
export class WalletComponent implements OnInit, OnDestroy {

  walletForm: FormGroup;
  itemType = 'Incoming';

  loadingSubscription: Subscription = new Subscription();
  isLoading: boolean;

  constructor(private walletService: WalletService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubscription = this.store
      .select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);

    this.walletForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(1)),
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  createWalletItem() {
    this.store.dispatch(new fromUIActions.ActivateLoadingAction());
    const walletItem = new WalletItem({...this.walletForm.value, type: this.itemType });
    this.walletService
      .createWalletItem(walletItem)
      .then(() => {
        Swal.fire('Wallet notification', `[${this.itemType}] ${walletItem.description} added successfully`, 'success');
        this.walletForm.reset({ amount: 0 });
        this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
      })
      .catch(err => {
        Swal.fire('Wallet notification', `${err.message}`, 'error');
        this.walletForm.reset({ amount: 0 });
        this.store.dispatch(new fromUIActions.DeactivateLoadingAction());
      });
  }

}
