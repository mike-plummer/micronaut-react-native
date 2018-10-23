import { Action } from 'redux';
import { MRN } from '..';

export enum Types {
  LOGIN = 'AUTH.LOGIN',
  LOGOUT = 'AUTH.LOGOUT',
  USER_LOADED = 'AUTH.USER_LOADED',
  REFRESH = 'AUTH.REFRESH',
  ERROR = 'AUTH.ERROR',
  TOKEN_REFRESH = 'AUTH.TOKEN_REFRESH',
  SET_AUTO_REFRESH = 'AUTH.SET_AUTO_REFRESH',
  TOKEN_EXPIRED = 'AUTH.TOKEN_EXPIRED'
}

export interface Login extends Action<Types.LOGIN> {
  username: string;
  password: string;
}

export interface UserLoaded extends Action<Types.USER_LOADED> {
  user: MRN.Structs.User;
}

export interface Logout extends Action<Types.LOGOUT> {}

export interface Error extends Action<Types.ERROR> {
  error: string;
}

export interface TokenRefresh extends Action<Types.ERROR> {
  timestamp: string;
}

export interface SetAutoRefresh extends Action<Types.SET_AUTO_REFRESH> {
  autoRefresh: boolean;
}

export interface TokenExpired extends Action<Types.TOKEN_EXPIRED> {}