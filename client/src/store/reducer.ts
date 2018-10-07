import { Action, combineReducers, Reducer } from 'redux';
import { MRN } from '../model';
import authReducer from '../app/store/auth/auth.reducer';
import dataReducer from '../app/store/data/data.reducer';

const appReducer = combineReducers<MRN.State.State>({
  auth: authReducer,
  data: dataReducer
});

const rootReducer: Reducer<MRN.State.State> = (
  state: MRN.State.State,
  action: Action
): MRN.State.State => {
  if (action.type === MRN.Actions.Auth.Types.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;