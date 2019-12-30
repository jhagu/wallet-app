import {Action} from '@ngrx/store';

export enum LoadingActionsType {
  UI_ACTIVATE_LOADING = '[UI] ACTIVATE LOADING',
  UI_DEACTIVATE_LOADING = '[UI] DEACTIVATE LOADING'
}

export class ActivateLoadingAction implements Action {
  readonly type = LoadingActionsType.UI_ACTIVATE_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type = LoadingActionsType.UI_DEACTIVATE_LOADING;
}

export type LoadingActions = ActivateLoadingAction |
                             DeactivateLoadingAction;
