import { MRN } from "../../../model";
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux';
import { createReducer } from '../../../util/redux.util';

export const initialState: MRN.State.Auth = Immutable({
  autoRefresh: true,
  loading: false,
  error: null,
  user: null,
  lastTokenRefresh: null,
  expired: false
});

export const setAutoRefresh = (state: MRN.State.Auth, { autoRefresh }: MRN.Actions.Auth.SetAutoRefresh): MRN.State.Auth =>
  Immutable.from(state).merge({
    autoRefresh
  });

export const onLogin = (state: MRN.State.Auth): MRN.State.Auth =>
  Immutable.from(state).merge({
    loading: true
  });

export const userLoaded = (state: MRN.State.Auth, { user }: MRN.Actions.Auth.UserLoaded): MRN.State.Auth =>
  Immutable.from(state).merge({
    loading: false,
    user,
    error: null
  });

export const onError = (state: MRN.State.Auth, { error }: MRN.Actions.Auth.Error): MRN.State.Auth =>
  Immutable.from(state).merge({
    loading: false,
    error
  });

export const tokenRefreshed = (state: MRN.State.Auth, { timestamp }: MRN.Actions.Auth.TokenRefresh): MRN.State.Auth =>
  Immutable.from(state).merge({
    lastTokenRefresh: timestamp,
    expired: false
  });

export const setExpired = (state: MRN.State.Auth) =>
  Immutable.from(state).merge({
    expired: true
  });

const auth: Reducer<MRN.State.Auth> = createReducer(initialState, {
  [MRN.Actions.Auth.Types.LOGIN]: onLogin,
  [MRN.Actions.Auth.Types.USER_LOADED]: userLoaded,
  [MRN.Actions.Auth.Types.ERROR]: onError,
  [MRN.Actions.Auth.Types.TOKEN_REFRESH]: tokenRefreshed,
  [MRN.Actions.Auth.Types.SET_AUTO_REFRESH]: setAutoRefresh,
  [MRN.Actions.Auth.Types.TOKEN_EXPIRED]: setExpired
});

export default auth;