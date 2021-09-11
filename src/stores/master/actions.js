import * as T from './constants';

export const fetchInvestors = data => ({
  type: T.FETCH_INVESTORS,
  payload: data,
});
export const fetchInvestorsLoading = () => ({
  type: T.FETCH_INVESTORS_LOADING,
});
export const fetchInvestorsSuccess = data => ({
  type: T.FETCH_INVESTORS_SUCCESS,
  payload: data,
});
export const fetchInvestorsFailure = data => ({
  type: T.FETCH_INVESTORS_FAILURE,
  payload: data,
});