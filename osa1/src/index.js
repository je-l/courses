import React from 'react';
import ReactDOM from 'react-dom';

import Anecdote from './Anecdote';

// exclusive upper bound
const randint = max => Math.floor(Math.random() * max);

class App extends React.Component {
  state = {
    selected: 0,
    anecdotes: this.props.anecdotes,
  };

  changeAnecdote = () => (
    this.setState({
      selected: randint(this.props.anecdotes.length),
    })
  )

  voteAnecdote = () => {
    const { selected, anecdotes } = this.state;

    anecdotes[selected].votes += 1;

    this.setState({
      anecdotes,
    });
  }

  render() {
    const { anecdotes } = this.props;

    const selection = anecdotes[this.state.selected];

    const winner = anecdotes.reduce((most, current) => (
      current.votes > most.votes ? current : most
    ));

    return (
      <div>
        <Anecdote contents={selection.content} votes={selection.votes} />

        <section>
          <button onClick={this.changeAnecdote}>seuraava anekdootti</button>
          <button onClick={this.voteAnecdote}>äänestä</button>
        </section>

        <h2>eniten ääniä:</h2>
        <Anecdote contents={winner.content} votes={winner.votes} />

      </div>
    );
  }
}

const anecdotes = [
  'If it hurts, do it more often',

  'Adding manpower to a late software project makes it later!',

  'The first 90 percent of the code accounts for the first 90 percent of the ' +
  'development time...The remaining 10 percent of the code accounts for the ' +
  'other 90 percent of the development time.',

  'Any fool can write code that a computer can understand. Good programmers ' +
  'write code that humans can understand.',

  'Premature optimization is the root of all evil.',

  'Debugging is twice as hard as writing the code in the first place. ' +
  'Therefore, if you write the code as cleverly as possible, you are, by ' +
  'definition, not smart enough to debug it.',
];

ReactDOM.render(
  <App anecdotes={anecdotes.map(a => ({ content: a, votes: 0 }))} />,
  document.getElementById('root'),
);
