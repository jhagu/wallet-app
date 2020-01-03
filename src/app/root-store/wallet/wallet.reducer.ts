import {WalletActions, WalletActionsType} from './wallet.actions';
import { WalletItem } from '../../models/walletItem.model';

export interface WalletState {
  items: WalletItem[];
}

const initialState: WalletState = {
  items: []
};

export function walletReducer(state = initialState, action: WalletActions): WalletState {
  switch ( action.type ) {
    case WalletActionsType.SET_ITEMS:
      return {
        items: [ ...action.items.map(item => {
          return {...item };
        })]
      };
    case WalletActionsType.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }

}
