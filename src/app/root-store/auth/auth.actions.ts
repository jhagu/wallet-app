import {Action} from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum AuthActionsType {
  SET_LOGUED_USER = '[AUTH] SET LOGUED USER'
}

export class SetLoguedUserAction implements Action {
  readonly type = AuthActionsType.SET_LOGUED_USER;
  constructor(public user: User) {}
}

export type AuthActions = SetLoguedUserAction;
