import { Action } from 'redux';

export enum Types {
  LOGIN = 'AUTH.LOGIN',
  LOGOUT = 'AUTH.LOGOUT',
  USER_LOADED = 'AUTH.USER_LOADED'
}

export interface Login extends Action<Types.LOGIN> {
  username: string;
  password: string;
}

export interface UserLoaded extends Action<Types.USER_LOADED> {
  user: {
    name: string;
    roles: string[];
  }
}