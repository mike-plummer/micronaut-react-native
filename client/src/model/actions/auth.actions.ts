import { Action } from 'redux';
import { MRN } from '..';

export enum Types {
  LOGIN = 'AUTH.LOGIN',
  LOGOUT = 'AUTH.LOGOUT',
  USER_LOADED = 'AUTH.USER_LOADED',
  REFRESH = 'AUTH.REFRESH',
  SET_TOKEN = 'AUTH.SET_TOKEN',
  ERROR = 'AUTH.ERROR'
}

export interface Login extends Action<Types.LOGIN> {
  username: string;
  password: string;
}

export interface UserLoaded extends Action<Types.USER_LOADED> {
  user: MRN.Structs.User;
}

export interface SetToken extends Action<Types.SET_TOKEN> {
  accessToken: string;
  refreshToken: string;
}

export interface Logout extends Action<Types.LOGOUT> {}

export interface Refresh extends Action<Types.REFRESH> {
  refreshToken: string;
}

export interface Error extends Action<Types.ERROR> {
  error: string;
}