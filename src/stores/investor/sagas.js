/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {
  assoc,
  curry,
  difference,
  groupBy,
  filter,
  isEmpty,
  keys,
  map,
  pipe,
  prop,
  slice,
  values,
} from 'ramda';
import { call, put, select } from 'redux-saga/effects';
import { DEFAULT_SIZE } from 'utils/base-data';
import * as A from './actions';
import * as S from './selectors';

export default ({ api }) => {
  const fetchRebates = function* ({ payload }) {
    try {
      yield put(A.fetchRebatesLoading());
      //const data = yield call(api.getRebates, action.payload);
      const data = yield axios.get('/data.json').then(prop('data'));
      const size =
        payload.size === 'all' ? Number.MAX_SAFE_INTEGER : payload.size;
      const res = slice(0, size, data.rebates);
      yield call(fetchRebate, res);
      yield put(A.fetchRebatesSuccess({ rebates: res }));
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  const fetchRebate = function* (payload) {
    try {
      const R = pipe(
        groupBy(r => r.investor?.investorId),
        map(r => ({
          parent: r[0].investor?.investorId,
          child: r,
        })),
        values
      );
      const res = R(payload);
      for (let i in res) {
        const { parent, child } = res[i];
        try {
          yield put(A.fetchRebateLoading({ parent }));
          yield put(A.fetchRebateSuccess({ parent, child }));
        } catch (e) {
          yield put(A.fetchRebateFailure({ parent, error: e }));
        }
      }
    } catch (e) {
      throw e;
    }
  };

  const getRebate = function* ({ payload }) {
    const { parent } = payload;
    try {
      yield put(A.fetchRebateLoading({ parent }));
      const { rebates } = yield axios.get('/data.json').then(prop('data'));
      const rebate = filter(
        ({ investor }) => investor.investorId === parent,
        rebates
      );
      // const data = yield call(api.getRebates, {
      //   investorId: payload.investorId,
      //   size: DEFAULT_SIZE,
      // });
      yield put(A.fetchRebateSuccess({ parent, child: rebate }));
    } catch (e) {
      yield put(A.fetchRebateFailure({ parent, error: e }));
    }
  };

  const createRebate = function* ({ payload }) {
    try {
      const { coas, investor: name, setupDate } = payload;
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
      //yield call(api.addRebate, [res]);
      console.log([res]);
      if ([res].length > 0) {
        yield call(fetchRebates, { payload: { size: DEFAULT_SIZE } });
      }
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  const saveRebate = function* (payload) {
    try {
      const { rebates } = (yield select(S.selectRebates)).getOrElse({});
      const rebate = yield select(S.selectRebate);
      const diff = pipe(
        map(r => difference(r.getOrElse([]), rebates)),
        filter(r => !isEmpty(r))
      );
      const ddiff = diff(rebate);
      const build = curry(k => ddiff[k]);
      const list = map(r => ({
        investorId: r,
        rebates: build(r),
      }));
      const res = list(keys(ddiff));
      // yield call(api.addRebate, res);
      console.log(res);
      if (res.length > 0) {
        yield call(fetchRebates, { payload: { size: DEFAULT_SIZE } });
      }
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  return { fetchRebates, getRebate, createRebate, saveRebate };
};
