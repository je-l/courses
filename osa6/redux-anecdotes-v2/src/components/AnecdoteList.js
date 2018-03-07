import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { setNotification } from '../reducers/notificationReducer';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const voteClicked = (dispatch, anecdote) => {
  dispatch(voteAnecdote(anecdote.id, anecdote.votes + 1));
  dispatch(setNotification(`voted '${anecdote.content}'`, 5));
};

const AnecdoteList = ({ anecdotes, dispatch }) => (
  <Fragment>
    <h2>Anecdotes</h2>
    <Filter />
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteClicked(dispatch, anecdote)}>vote</button>
        </div>
      </div>
    ))}
  </Fragment>
);

export default connect()(AnecdoteList);
