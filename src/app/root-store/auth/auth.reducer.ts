import {AuthActionsType, AuthActions} from './auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionsType.SET_LOGUED_USER:
      return {
        user: {...action.user}
      };
    case AuthActionsType.UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}
