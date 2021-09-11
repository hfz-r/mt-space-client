import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import { connectRouter } from 'connected-react-router';
import investorReducer from './investor/reducers';
import masterReducer from './master/reducers';
import queryReducer from './query/reducers';
import queryAppReducer from './query-app/reducers';
import filterUndoableActions from './undo-filter';

export default function rootReducer(history) {
  const reducers = combineReducers({
    router: connectRouter(history),
    investor: investorReducer,
    master: masterReducer,
    query: undoable(queryReducer, { limit: 10, filter: filterUndoableActions }),
    queryApp: queryAppReducer,
  });
  return reducers;
}
