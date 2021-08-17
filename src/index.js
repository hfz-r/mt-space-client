import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from 'containers/app';
import Error from 'containers/ErrorBoundary/template_';
import configureStore from 'configureStore';
import * as serviceWorker from 'serviceWorker';

const renderApp = (_, store, history) => {
  const render = (Component, store, history) => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component store={store} history={history} />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  };
  render(App, store, history);
};

const renderError = e => {
  console.error(e);
  ReactDOM.render(
    <Error error="An error has occured" errorInfo={e} />,
    document.getElementById('app')
  );
};

configureStore()
  .then(root => {
    renderApp(App, root.store, root.history);
  })
  .catch(e => {
    renderError(e);
  });

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
}
