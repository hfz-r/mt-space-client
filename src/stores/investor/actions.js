import * as T from './constants';

export const fetchRebates = request => ({
  type: T.FETCH_REBATES,
  payload: request || {},
});

export const fetchRebatesLoading = () => ({
  type: T.FETCH_REBATES_LOADING,
});

export const fetchRebatesSuccess = data => ({
  type: T.FETCH_REBATES_SUCCESS,
  payload: data,
});

export const fetchRebatesFailure = data => ({
  type: T.FETCH_REBATES_FAILURE,
  payload: data,
});
