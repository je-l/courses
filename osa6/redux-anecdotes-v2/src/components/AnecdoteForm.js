import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.dispatch(createAnecdote(content));
    this.props.dispatch(setNotification(`Added new note '${content}'`, 5));

    e.target.anecdote.value = '';
  };
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default connect()(AnecdoteForm);
