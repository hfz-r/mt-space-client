/* eslint-disable import/no-anonymous-default-export */
import { takeLatest } from 'redux-saga/effects';
import {
  FETCH_REBATES,
  GET_REBATE,
  CREATE_REBATE,
  SAVE_REBATE,
} from './constants';
import sagas from './sagas';

export default ({ api }) => {
  const saga = sagas({ api });

  return function* investorSaga() {
    yield takeLatest(FETCH_REBATES, saga.fetchRebates);
    yield takeLatest(GET_REBATE, saga.getRebate);
    yield takeLatest(CREATE_REBATE, saga.createRebate);
    yield takeLatest(SAVE_REBATE, saga.saveRebate);
  };
};
