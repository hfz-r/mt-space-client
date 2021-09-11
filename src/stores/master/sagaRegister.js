/* eslint-disable import/no-anonymous-default-export */
import { fork } from 'redux-saga/effects';
import sagas from './sagas';

export default ({ api }) => {
  const saga = sagas({ api });
  return function* masterSaga() {
    yield fork(saga.watch);
  };
};
