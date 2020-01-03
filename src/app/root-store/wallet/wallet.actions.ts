import {Action} from '@ngrx/store';
import { WalletItem } from '../../models/walletItem.model';

export enum WalletActionsType {
  SET_ITEMS = '[WALLET] SET WALLET ITEMS',
  UNSET_ITEMS = '[WALLET] UNSET WALLET ITEMS'
}

export class SetWalletItemsAction implements Action {
  readonly type = WalletActionsType.SET_ITEMS;
  constructor(public items: WalletItem[]) {}
}

export class UnsetWalletItemsAction implements Action {
  readonly type = WalletActionsType.UNSET_ITEMS;
}

export type WalletActions = SetWalletItemsAction |
                            UnsetWalletItemsAction;
