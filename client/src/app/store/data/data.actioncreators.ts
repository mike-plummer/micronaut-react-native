import { MRN } from "../../../model";
import { createAction } from '../../../util/redux.util';

const fetch = (): MRN.Actions.Data.Fetch =>
  createAction(MRN.Actions.Data.Types.FETCH);

const fetchSuccess = (data: string): MRN.Actions.Data.FetchSuccess =>
  createAction(MRN.Actions.Data.Types.FETCH_SUCCESS, {
    data
  });

const fetchError = (error: Error): MRN.Actions.Data.FetchError =>
  createAction(MRN.Actions.Data.Types.FETCH_ERROR, {
    error: error.message
  });

const DataActionCreators = {
  fetch,
  fetchSuccess,
  fetchError
};

export {
  DataActionCreators
}