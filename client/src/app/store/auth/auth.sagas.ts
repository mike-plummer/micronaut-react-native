import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { MRN } from '../../../model';
import { createWatchers } from '../../../util/saga.util';

export function* login({username, password}: MRN.Actions.Auth.Login): SagaIterator {
  try {

  } catch (error) {

  }
}

export const authWatchers = createWatchers({
  [MRN.Actions.Auth.Types.LOGIN]: { saga: login, effect: takeLatest }
});