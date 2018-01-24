import React from 'react';
import ReactDOM from 'react-dom';

import Statistics from './component/Statistics';
import Button from './component/Button';

class App extends React.Component {
  state = {
    goodVotes: 0,
    neutralVotes: 0,
    badVotes: 0,
  }

  incrementVote = vote => () => {
    this.setState(prev => ({ [vote]: prev[vote] + 1 }));
  }

  render() {
    const { goodVotes, neutralVotes, badVotes } = this.state;

    const hasVotes = goodVotes || neutralVotes || badVotes;

    return (
      <div>
        <h2>anna palautetta</h2>
        <Button onClick={this.incrementVote('goodVotes')}>hyvä</Button>
        <Button onClick={this.incrementVote('neutralVotes')}>neutraali</Button>
        <Button onClick={this.incrementVote('badVotes')}>huono</Button>
        {hasVotes ? (
          <Statistics
            goodVotes={goodVotes}
            neutralVotes={neutralVotes}
            badVotes={badVotes}
          />
        ) : <p>ei yhtään palautetta annettu</p>}

      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
