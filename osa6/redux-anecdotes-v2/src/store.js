import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
