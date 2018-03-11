import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './app.duck';
import Page from './Page';

const middleware = [thunk, process.env.TEST ? null : logger].filter(i => i);

const store = createStore(reducer, applyMiddleware(...middleware));

const ReduxApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </Provider>
);

export default ReduxApp;
