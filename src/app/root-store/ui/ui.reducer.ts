import {LoadingActionsType, LoadingActions } from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

export const initialState: UIState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: LoadingActions ): UIState {
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
