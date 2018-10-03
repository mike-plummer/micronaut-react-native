import { MRN } from "../../../model";
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux';
import { createReducer } from '../../../util/redux.util';

export const initialState: MRN.State.Auth = Immutable({
  loaded: false,
  token: null,
  user: null
});

export const userLoaded = (state: MRN.State.Auth, { user }: MRN.Actions.Auth.UserLoaded): MRN.State.Auth =>
  Immutable.from(state).merge({
    loaded: false,
    user
  });

const auth: Reducer<MRN.State.Auth> = createReducer(initialState, {
  [MRN.Actions.Auth.Types.USER_LOADED]: userLoaded
});

export default auth;