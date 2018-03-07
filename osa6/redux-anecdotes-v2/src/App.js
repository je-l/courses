import React from 'react';
import { connect } from 'react-redux';
import { fetchAnecdotes } from './reducers/anecdoteReducer';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAnecdotes());
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList anecdotes={this.props.anecdotes} />
        <AnecdoteForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { anecdotes, filter } = state;

  const filtered = anecdotes
    .filter(a => a.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes);

  return {
    anecdotes: filtered,
  };
};

export default connect(mapStateToProps)(App);
