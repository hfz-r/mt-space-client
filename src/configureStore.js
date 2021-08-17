import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createApi from './api';
import { rootReducer, rootSaga } from './stores';
import serializer from './utils/Serializer';

const devToolsConfig = {
  serialize: serializer,
};

const configureStore = async function (preloadedState = {}) {
  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsConfig)
    : compose;

  const api = createApi();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga, {
    api,
  });

  return {
    history,
    store,
  };
};

export default configureStore;
