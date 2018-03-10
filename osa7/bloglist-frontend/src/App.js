import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './app.duck';
import Page from './Page';

const store = createStore(reducer, applyMiddleware(thunk, logger));

const ReduxApp = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);

export default ReduxApp;
