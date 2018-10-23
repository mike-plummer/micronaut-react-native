import { delay, SagaIterator } from 'redux-saga';
import { call, cancelled, put, race, select, take, takeLatest } from 'redux-saga/effects';
import { MRN } from '../../../model';
import { createWatchers } from '../../../util/saga.util';
import { AuthActionCreators } from './auth.actioncreators';
import { acquireToken, refreshToken } from '../../../util/fetcher';
import { Base64 } from 'js-base64';
import Hash from 'hash.js';

export function* login({ username, password }: MRN.Actions.Auth.Login): SagaIterator {
  try {
    /*
    POST the username and hashed password to the server for validation
    We use SHA-512 here out of convenience for this example - see AuthenticationService.java for more info on how to improve
    By hashing the password on-device we prevent interception of the plain-text password over the wire by malicious attackers,
    but they could still intercept and use the hashed version to authenticate against our services which is why secure SSL/HTTPS
    is a necessary component to this pattern
     */
    const loginResponse = yield call(acquireToken, {
      username,
      password: Hash.sha512().update(password).digest('hex')
    });

    const body = (yield call(loginResponse.json.bind(loginResponse))) as MRN.Structs.LoginResponse;

    /*
    The JWT is composed of three Base64-encoded segments:
    1. Header - indicates algorithm used to generate the JWT
    2. Payload - Contains 'claims', assertions made by the server about the JWT itself and the user it represents
       - iat: Issued-At timestamp (millis)
       - iss: Issuer
       - nbf: Not Before timestamp (millis)
       - exp: Expiration timestamp (millis)
       - sub: Subject
    3. Signature - PKE signature to allow validation of JWT contents
     */
    const jwtSegments = body.access_token.split('.');
    console.log('Header:');
    console.log(JSON.parse(Base64.decode(jwtSegments[0])));
    console.log('Payload:');
    console.log(JSON.parse(Base64.decode(jwtSegments[1])));

    /*
    Notify the app that the constructed user has logged in
     */
    yield put(AuthActionCreators.userLoaded({
      username: body.username,
      roles: body.roles
    }));

    /*
    Notify the app that we've acquired a new token
     */
    yield put(AuthActionCreators.tokenRefreshed());

    /*
    Kick off a long-running loop that will attempt to refresh the accessToken as it expires. Note that since this is a generator
    it is not spinning but is rather suspended between loop executions
     */
    while (true) {
      /*
      Wait until either the user logs out or the timer expires, whichever happens first
       */
      const result = yield race({
        logout: take([MRN.Actions.Auth.Types.LOGOUT]),
        timeout: call(delay, body.expires_in * 1000)
      });

      /*
      If user logged out, then exit the loop
       */
      if (result.logout || (yield cancelled())) {
        break;
      }

      /*
      Check to see if we've turned off auto-refresh.
       */
      const state = (yield select()) as MRN.State.State;
      if (!state.auth.autoRefresh) {
        // If auto-refresh disabled, then mark token as expired
        yield put(AuthActionCreators.tokenExpired());
      } else {
        // Otherwise, refresh the token
        yield call(refresh);
      }
    }
  } catch (err) {
    yield put(AuthActionCreators.error(err));
  }
}

export function* refresh(): SagaIterator {
  try {
    yield call(refreshToken);
    yield put(AuthActionCreators.tokenRefreshed());
  } catch (error) {
    yield put(AuthActionCreators.error(error));
  }
}

export const authWatchers = createWatchers({
  [ MRN.Actions.Auth.Types.LOGIN ]: { saga: login, effect: takeLatest },
  [ MRN.Actions.Auth.Types.REFRESH ]: { saga: refresh, effect: takeLatest }
});