import { MRN } from "../../../model";

const login = (username: string, password: string): MRN.Actions.Auth.Login => ({
  type: MRN.Actions.Auth.Types.LOGIN,
  username,
  password
});

const AuthActionCreators = {
  login
};

export {
  AuthActionCreators
}