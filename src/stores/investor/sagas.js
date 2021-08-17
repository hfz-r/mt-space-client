/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { prop } from 'ramda';
import { call, put } from 'redux-saga/effects';
import * as A from './actions';

export default ({ api }) => {
  const fetchRebates = function* (action) {
    try {
      yield put(A.fetchRebatesLoading());
      //const data = yield call(api.getRebates, action.payload);
      //debugging purpose - fetch from json
      const data = yield axios.get('/data.json').then(prop('data'));
      yield put(A.fetchRebatesSuccess(data));
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  return { fetchRebates };
};
