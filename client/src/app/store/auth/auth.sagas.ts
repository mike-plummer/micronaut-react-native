import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MRN } from '../../../model';
import { createWatchers } from '../../../util/saga.util';
import { AuthActionCreators } from './auth.actioncreators';
import { get, post } from '../../../util/fetcher';

export function* login({ username, password }: MRN.Actions.Auth.Login): SagaIterator {
  try {
    const loginResponse = yield call(post, '/login', {
        username,
        password
    });

    const loginBody = (yield call(loginResponse.json.bind(loginResponse))) as MRN.Structs.LoginResponse;

    yield put(AuthActionCreators.setToken(loginBody.access_token, loginBody.refresh_token));

    yield put(AuthActionCreators.userLoaded({
      username: loginBody.username,
      roles: loginBody.roles
    }));
  } catch (err) {
    yield put(AuthActionCreators.error(err));
  }
}

export function* refresh({ refreshToken }: MRN.Actions.Auth.Refresh): SagaIterator {
  try {
    const response = yield call(post, '/refresh', {
      refreshToken
    });

    const body = yield call(response.json.bind(response));

    yield put(AuthActionCreators.setToken(body.accessToken, body.refreshToken));
  } catch (error) {
    yield put(AuthActionCreators.error(error));
  }
}

export function* logout(): SagaIterator {
  try {
    yield call(post, '/revoke');
  } catch (error) {
    yield put(AuthActionCreators.error(error));
  }
}

export const authWatchers = createWatchers({
  [ MRN.Actions.Auth.Types.LOGIN ]: { saga: login, effect: takeLatest },
  [ MRN.Actions.Auth.Types.REFRESH ]: { saga: refresh, effect: takeLatest },
  [ MRN.Actions.Auth.Types.LOGOUT ]: { saga: logout, effect: takeLatest }
});