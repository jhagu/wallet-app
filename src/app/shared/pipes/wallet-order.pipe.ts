import { Pipe, PipeTransform } from '@angular/core';
import { WalletItem } from '../../models/walletItem.model';

@Pipe({
  name: 'walletOrder'
})
export class WalletOrderPipe implements PipeTransform {

  transform(items: WalletItem[]): WalletItem[] {
    return items.sort((a) => {
      if (a.type === 'Incoming') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
