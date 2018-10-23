import { MRN } from "../../../model";
import { createAction } from '../../../util/redux.util';

const login = (username: string, password: string): MRN.Actions.Auth.Login =>
  createAction(MRN.Actions.Auth.Types.LOGIN, {
  username,
  password
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

const tokenRefreshed = (): MRN.Actions.Auth.TokenRefresh =>
  createAction(MRN.Actions.Auth.Types.TOKEN_REFRESH, {
    timestamp: new Date().toLocaleString()
  });

const setAutoRefresh = (autoRefresh: boolean): MRN.Actions.Auth.SetAutoRefresh =>
  createAction(MRN.Actions.Auth.Types.SET_AUTO_REFRESH, {
    autoRefresh
  });

const tokenExpired = (): MRN.Actions.Auth.TokenExpired =>
  createAction(MRN.Actions.Auth.Types.TOKEN_EXPIRED);

const AuthActionCreators = {
  login,
  logout,
  error,
  userLoaded,
  tokenRefreshed,
  setAutoRefresh,
  tokenExpired
};

export {
  AuthActionCreators
}