import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//  import { AppState } from '../../../root-store/index';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { WalletItem } from '../../../models/walletItem.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: []
})
export class StatsComponent implements OnInit, OnDestroy {

  subscriptionStore: Subscription = new Subscription();

  incomingsAmount: number;
  expensesAmount: number;

  incomingsCount: number;
  expensesCount: number;

  public doughnutChartLabels: Label[] = ['Incomings', 'Expenses'];
  public doughnutChartData: MultiDataSet = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptionStore =
    this.store
      .select('wallet')
      .subscribe( wallet => {
        this.getStats(wallet.items);
      });
  }

  getStats( items: WalletItem[]) {
    this.expensesAmount = 0;
    this.expensesCount = 0;
    this.incomingsAmount = 0;
    this.incomingsCount = 0;

    items.forEach( item => {
      if (item.type === 'Incoming') {
        this.incomingsCount++;
        this.incomingsAmount += item.amount;
      } else {
        this.expensesCount++;
        this.expensesAmount += item.amount;
      }
    });

    this.doughnutChartData.push([this.incomingsAmount, this.expensesAmount]);
  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
  }

}
