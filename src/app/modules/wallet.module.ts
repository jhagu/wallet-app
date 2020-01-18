import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { WalletComponent } from '../components/wallet/wallet.component';
import { StatsComponent } from '../components/wallet/stats/stats.component';
import { DetailComponent } from '../components/wallet/detail/detail.component';
import { WalletOrderPipe } from '../shared/pipes/wallet-order.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
//  import { StoreModule } from '@ngrx/store';
//  import { walletReducer } from '../root-store/wallet/wallet.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    WalletComponent,
    StatsComponent,
    DetailComponent,
    WalletOrderPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    //  StoreModule.forFeature('wallet', walletReducer)
  ]
})
export class WalletModule { }
