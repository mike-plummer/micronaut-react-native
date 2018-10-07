import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MRN } from '../../../model';
import { createWatchers } from '../../../util/saga.util';
import { get } from '../../../util/fetcher';
import { DataActionCreators } from './data.actioncreators';

export function* fetch(): SagaIterator {
  try {
    const response = yield call(get, '/data');

    const body = (yield call(response.json.bind(response))) as string;

    yield put(DataActionCreators.fetchSuccess(body));
  } catch (err) {
    yield put(DataActionCreators.fetchError(err));
  }
}

export const dataWatchers = createWatchers({
  [ MRN.Actions.Data.Types.FETCH ]: { saga: fetch, effect: takeLatest },
});