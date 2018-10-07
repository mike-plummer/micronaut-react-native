import { MRN } from "../../../model";
import { createAction } from '../../../util/redux.util';

const login = (username: string, password: string): MRN.Actions.Auth.Login =>
  createAction(MRN.Actions.Auth.Types.LOGIN, {
  username,
  password
});

const setToken = (accessToken: string, refreshToken: string): MRN.Actions.Auth.SetToken =>
  createAction(MRN.Actions.Auth.Types.SET_TOKEN, {
    accessToken,
    refreshToken
  });

const refresh = (refreshToken: string): MRN.Actions.Auth.Refresh =>
  createAction(MRN.Actions.Auth.Types.REFRESH, {
    refreshToken
  });

const logout = (): MRN.Actions.Auth.Logout =>
  createAction(MRN.Actions.Auth.Types.LOGOUT);

const error = (error: Error): MRN.Actions.Auth.Error =>
  createAction(MRN.Actions.Auth.Types.ERROR, {
    error: error.message
  });

const userLoaded = (user: MRN.Structs.User): MRN.Actions.Auth.UserLoaded =>
  createAction(MRN.Actions.Auth.Types.USER_LOADED, {
    user
  });

const AuthActionCreators = {
  login,
  setToken,
  refresh,
  logout,
  error,
  userLoaded
};

export {
  AuthActionCreators
}