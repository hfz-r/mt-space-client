/* eslint-disable import/no-anonymous-default-export */
import { takeLatest } from 'redux-saga/effects';
import { FETCH_REBATES } from './constants';
import sagas from './sagas';

export default ({ api }) => {
  const saga = sagas({ api });

  return function* investorSaga() {
    yield takeLatest(FETCH_REBATES, saga.fetchRebates);
    // yield takeLatest(CREATE_REBATE);
  };
};
