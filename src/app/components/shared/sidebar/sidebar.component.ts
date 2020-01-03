import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { filter } from 'rxjs/operators';
import { WalletService } from '../../../services/wallet.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  currentUserSubscription: Subscription = new Subscription();
  currentUserName: string;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private walletService: WalletService) { }

  ngOnInit() {
    this.currentUserSubscription =
    this.store
      .select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => {
        this.currentUserName = auth.user.name;
      });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.walletService.cancelSubscriptions();
  }

}
