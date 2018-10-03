import { Action, combineReducers, Reducer } from 'redux';
import { MRN } from '../model';
import authReducer from '../app/store/auth/auth.reducer';

const appReducer = combineReducers<MRN.State.State>({
  auth: authReducer
});

const rootReducer: Reducer<MRN.State.State> = (
  state: MRN.State.State,
  action: Action
): MRN.State.State => {
  if (action.type === MRN.Actions.Auth.Types.LOGOUT) { //TODO
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;