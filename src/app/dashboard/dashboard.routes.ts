import { Routes } from '@angular/router';
import { StatsComponent } from '../wallet/stats/stats.component';
import { WalletComponent } from '../wallet/wallet.component';
import { DetailComponent } from '../wallet/detail/detail.component';


export const dashboardRoutes: Routes = [
  {path: '', component: StatsComponent},
  {path: 'wallet', component: WalletComponent},
  {path: 'detail', component: DetailComponent}
];

