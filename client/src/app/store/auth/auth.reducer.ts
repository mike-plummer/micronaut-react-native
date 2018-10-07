import { MRN } from "../../../model";
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux';
import { createReducer } from '../../../util/redux.util';

export const initialState: MRN.State.Auth = Immutable({
  loaded: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null
});

export const userLoaded = (state: MRN.State.Auth, { user }: MRN.Actions.Auth.UserLoaded): MRN.State.Auth =>
  Immutable.from(state).merge({
    loaded: true,
    user,
    error: null
  });

export const setToken = (state: MRN.State.Auth, { accessToken, refreshToken }: MRN.Actions.Auth.SetToken): MRN.State.Auth =>
  Immutable.from(state).merge({
    accessToken,
    refreshToken
  });

export const onError = (state: MRN.State.Auth, { error }: MRN.Actions.Auth.Error): MRN.State.Auth =>
  Immutable.from(state).merge({
    error
  });

const auth: Reducer<MRN.State.Auth> = createReducer(initialState, {
  [MRN.Actions.Auth.Types.USER_LOADED]: userLoaded,
  [MRN.Actions.Auth.Types.SET_TOKEN]: setToken,
  [MRN.Actions.Auth.Types.ERROR]: onError
});

export default auth;