import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//  import { AppState } from '../../../root-store/index';
import { AppState } from '../../../app.reducer';
import { WalletItem } from '../../../models/walletItem.model';
import { Subscription } from 'rxjs';
import { WalletService } from '../../../services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  walletItemSubscription: Subscription = new Subscription();
  items: WalletItem[];

  constructor(private store: Store<AppState>,
              private walletService: WalletService) { }

  ngOnInit() {
    this.walletItemSubscription =
    this.store
      .select('wallet')
      .subscribe(wallet => {
        this.items = wallet.items;
      });
  }

  deleteItem(item: WalletItem) {
    this.walletService
      .deleteItem(item.uid)
      .then( () => {
        Swal.fire('Details Notification', `${item.description} removed successfully`, 'success');
      })
      .catch((err) => {
        Swal.fire('Details Notification', 'Something went wrong', 'error');
      });
  }

  ngOnDestroy() {
    this.walletItemSubscription.unsubscribe();
  }
}
