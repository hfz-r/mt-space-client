import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import investorReducer from './investor/reducers';

export default function rootReducer(history) {
  const reducers = combineReducers({
    router: connectRouter(history),
    investor: investorReducer,
  });
  return reducers;
}
