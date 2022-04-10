/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { prop, slice } from 'ramda';
import { call, put, take, spawn } from 'redux-saga/effects';
import * as T from './constants';
import * as A from './actions';

export default ({ api }) => {
  const watch = function* () {
    try {
      const action = yield take(T.FETCH_INVESTORS);
      yield spawn(fetchInvestors, action);
    } catch (e) {
      throw e;
    }
  };

  const fetchInvestors = function* ({ payload }) {
    try {
      yield put(A.fetchInvestorsLoading());
      // const data = yield call(api.getInvestors, payload);
      const data = yield axios.get('/investors.json').then(prop('data'));
      yield put(A.fetchInvestorsSuccess(data));
    } catch (e) {
      yield put(A.fetchInvestorsFailure(e));
    }
  };

  return {
    watch,
  };
};
