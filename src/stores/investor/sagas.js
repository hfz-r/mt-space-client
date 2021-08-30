/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { assoc, map, prop } from 'ramda';
import { call, put, select } from 'redux-saga/effects';
import * as A from './actions';
import * as S from './selectors';

export default ({ api }) => {
  const fetchRebates = function* (action) {
    try {
      yield put(A.fetchRebatesLoading());
      const data = yield call(api.getRebates, action.payload);
      //debugging purpose - fetch from json
      //const data = yield axios.get('/data.json').then(prop('data'));
      yield put(A.fetchRebatesSuccess(data));
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  const addRebate = function* ({ payload }) {
    const { coas, investor: name, setupDate } = payload;
    try {
      yield put(A.addRebateLoading());

      const { investor } = (yield select(S.makeSelectInvestor)).getOrElse([]);
      const i = investor.find(i => i.investorName === name);
      const res = {
        investorId: i.investorId,
        rebates: map(c => ({
          ...assoc('investor', i, c),
          ...assoc('setupDate', setupDate, c),
          ...c,
        }))(coas),
      };

      yield call(api.addRebate, res);
      yield call(fetchRebates, { payload: { size: 1000 } });
      yield put(A.addRebateSuccess(res));
    } catch (e) {
      yield put(A.addRebateFailure(e));
    }
  };

  const persistTable = function* ({ payload }) {
    try {
      yield put(A.addRebateLoading());
      //yield call(api.addRebate, payload);
      console.log(payload);
      yield put(A.addRebateSuccess(payload));
      yield;
    } catch (e) {
      yield put(A.addRebateFailure(e));
    }
  };

  return { fetchRebates, addRebate, persistTable };
};
