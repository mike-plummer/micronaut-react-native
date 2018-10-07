import { Action } from 'redux';
import { MRN } from '..';

export enum Types {
  FETCH = 'DATA.FETCH',
  FETCH_SUCCESS = 'DATA.FETCH_SUCCESS',
  FETCH_ERROR = 'DATA.FETCH_ERROR'
}

export interface Fetch extends Action<Types.FETCH> {
}

export interface FetchSuccess extends Action<Types.FETCH_SUCCESS> {
  data: string;
}

export interface FetchError extends Action<Types.FETCH_ERROR> {
  error: string;
}
