import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './root-store/ui/ui.reducer';
import * as fromAuthReducer from './root-store/auth/auth.reducer';

export interface AppState {
  ui: fromUIReducer.State;
  auth: fromAuthReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer
};

