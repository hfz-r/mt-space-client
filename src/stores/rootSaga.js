import { all, fork } from 'redux-saga/effects';
import investor from './investor/sagaRegister';
import master from './master/sagaRegister';

export default function* rootSaga({ api }) {
  yield all([fork(investor({ api })), fork(master({ api }))]);
}
