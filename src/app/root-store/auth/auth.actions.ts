import {Action} from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionsType {
  SET_LOGUED_USER = '[AUTH] SET LOGUED USER',
  UNSET_USER = '[AUTH] UNSET USER'
}

export class SetLoguedUserAction implements Action {
  readonly type = AuthActionsType.SET_LOGUED_USER;
  constructor(public user: User) {}
}

export class UnsetUser implements Action {
  readonly type = AuthActionsType.UNSET_USER;
}

export type AuthActions = SetLoguedUserAction | UnsetUser;
