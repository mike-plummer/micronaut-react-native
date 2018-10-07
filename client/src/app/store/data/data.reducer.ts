import { MRN } from "../../../model";
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux';
import { createReducer } from '../../../util/redux.util';

export const initialState: MRN.State.Data = Immutable({
  loading: false,
  error: null,
  data: null
});

export const fetch = (state: MRN.State.Data): MRN.State.Data =>
  Immutable.from(state).merge({
    loading: true,
    data: null,
    error: null
  });

export const fetchSuccess = (state: MRN.State.Data, { data }: MRN.Actions.Data.FetchSuccess): MRN.State.Data =>
  Immutable.from(state).merge({
    loading: false,
    data
  });

export const fetchError = (state: MRN.State.Data, { error }: MRN.Actions.Data.FetchError): MRN.State.Data =>
  Immutable.from(state).merge({
    loading: false,
    error
  });

const data: Reducer<MRN.State.Data> = createReducer(initialState, {
  [MRN.Actions.Data.Types.FETCH]: fetch,
  [MRN.Actions.Data.Types.FETCH_SUCCESS]: fetchSuccess,
  [MRN.Actions.Data.Types.FETCH_ERROR]: fetchError
});

export default data;