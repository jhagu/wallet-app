import {LoadingActionsType, LoadingActions } from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: LoadingActions ): State {
  switch (action.type) {
    case LoadingActionsType.UI_ACTIVATE_LOADING:
      return {
        isLoading: true
      };
    case LoadingActionsType.UI_DEACTIVATE_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
