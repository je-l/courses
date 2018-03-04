import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addVote, createAnecdote } from './reducer';

class App extends React.Component {
  state = {
    newValue: '',
  };

  onAddVote = (event, id) => {
    event.preventDefault();

    this.props.dispatch(addVote(id));
  };

  onCreateNew = event => {
    event.preventDefault();

    const { newValue } = this.state;
    this.setState({ newValue: '' });
    this.props.dispatch(createAnecdote(newValue));
  };

  render() {
    return (
      <Fragment>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(({ id, content, votes }) => (
          <div key={id}>
            <div>{content}</div>
            <div>
              has {votes}
              <button onClick={e => this.onAddVote(e, id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form>
          <div>
            <input
              value={this.state.newValue}
              onChange={e => this.setState({ newValue: e.target.value })}
            />
          </div>
          <button onClick={this.onCreateNew}>create</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  anecdotes: state.sort((a, b) => b.votes - a.votes),
});

export default connect(mapStateToProps)(App);
