import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer, { positiveVote, neutralVote, negativeVote } from './votes.duck';

import Statistics from './Statistics';

const App = ({ dispatch }) => (
  <div>
    <h2>anna palautetta</h2>
    <button onClick={() => dispatch(positiveVote())}>hyvä</button>
    <button onClick={() => dispatch(neutralVote())}>neutraali</button>
    <button onClick={() => dispatch(negativeVote())}>huono</button>
    <Statistics />
  </div>
);

const AppWrap = connect()(App);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <AppWrap />
  </Provider>,
  document.getElementById('root'),
);
