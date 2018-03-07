import {
  getAllAnecdotes,
  voteAnecdote as voteAnecdoteReq,
  createNewAnecdote,
} from '../api/anecdoteService';

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdote = content => dispatch => {
  const newId = getId();

  const newAnecdote = {
    content,
    id: newId,
    votes: 0,
  };

  createNewAnecdote(newAnecdote).then(() => {
    dispatch({
      type: 'CREATE',
      content,
      id: newId,
    });
  });
};

export const voteAnecdote = (id, newVotes) => dispatch => {
  voteAnecdoteReq(id, newVotes).then(() => {
    dispatch({ type: 'VOTE', id });
  });
};

export const fetchAnecdotes = () => dispatch => {
  getAllAnecdotes().then(anecdotes => {
    dispatch({
      type: 'FETCH_ALL',
      anecdotes,
    });
  });
};

const initialState = [];

const reducer = (store = initialState, action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id);
    const voted = store.find(a => a.id === action.id);

    return [...old, { ...voted, votes: voted.votes + 1 }];
  } else if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: action.id, votes: 0 }];
  } else if (action.type === 'FETCH_ALL') {
    return action.anecdotes;
  }

  return store;
};

export default reducer;
