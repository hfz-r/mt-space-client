/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {
  assoc,
  curry,
  difference,
  find,
  filter,
  isEmpty,
  keys,
  map,
  pipe,
  propEq,
  prop,
  slice,
} from 'ramda';
import { all, call, fork, put, select } from 'redux-saga/effects';
import { DEFAULT_SIZE } from 'utils/base-data';
import { selectors } from 'stores';
import * as A from './actions';
import * as S from './selectors';

export default ({ api }) => {
  const fetchRebates = function* ({ payload }) {
    try {
      const child = function* () {
        const rebate = yield select(S.makeSelectChild_);
        yield all(map(res => call(fetchRebate, res), rebate));
      };
      yield put(A.fetchRebatesLoading());
      // const data = yield call(api.getRebates, payload);
      const data = yield axios.get('/rebates.json').then(prop('data'));
      yield put(A.fetchRebatesSuccess(data));
      yield fork(child);
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  const fetchRebate = function* (payload) {
    const { parent, child } = payload;
    try {
      yield put(A.fetchRebateLoading({ parent }));
      yield put(A.fetchRebateSuccess({ parent, child }));
    } catch (e) {
      yield put(A.fetchRebateFailure({ parent, error: e }));
    }
  };

  const getRebate = function* ({ payload }) {
    const { parent } = payload;
    try {
      yield put(A.fetchRebateLoading({ parent }));
      const { rebates } = yield call(api.getRebates, {
        investorId: parent,
        size: DEFAULT_SIZE,
      });
      yield put(A.fetchRebateSuccess({ parent, child: rebates }));
    } catch (e) {
      yield put(A.fetchRebateFailure({ parent, error: e }));
    }
  };

  const createRebate = function* ({ payload }) {
    try {
      const { coas, investor: name, setupDate } = payload;
      const selector = yield select(selectors.master.selectInvestors);
      const { investors } = selector.getOrElse({});
      const i = find(propEq('investorName', name))(investors);
      const res = {
        rebates: map(c => ({
          investorId: i.investorId,
          ...assoc('setupDate', setupDate, c),
          ...c,
        }))(coas),
      };
      yield call(api.addRebate, [res]);
      if ([res].length > 0) {
        yield call(fetchRebates, { payload: { size: DEFAULT_SIZE } });
      }
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  const saveRebate = function* () {
    try {
      const { rebates: rb } = (yield select(S.selectRebates)).getOrElse({});
      const rebate = yield select(S.selectRebate);
      const diff = pipe(
        map(r => difference(r.getOrElse([]), rb)),
        filter(r => !isEmpty(r))
      );
      const ddiff = diff(rebate);
      const build = curry(k => ddiff[k]);
      const list = map(r => ({
        rebates: build(r),
      }));
      const res = list(keys(ddiff));
      yield call(api.addRebate, res);
      if (res.length > 0) {
        yield call(fetchRebates, { payload: { size: DEFAULT_SIZE } });
      }
    } catch (e) {
      yield put(A.fetchRebatesFailure(e));
    }
  };

  return { fetchRebates, getRebate, createRebate, saveRebate };
};
