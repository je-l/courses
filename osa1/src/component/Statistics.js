import React from 'react';

import Statistic from './Statistic';

const voteValues = {
  good: 1,
  neutral: 0,
  bad: -1,
};

const mean = (good, neutral, bad) => {
  const total = good + neutral + bad;

  if (!total) return 0;

  const goodValue = good * voteValues.good;
  const neutralValue = neutral * voteValues.neutral;
  const badValue = bad * voteValues.bad;

  return (goodValue + neutralValue + badValue) / total;
};

const positives = (good, neutral, bad) => {
  const total = good + neutral + bad;

  const segment = good / total;

  return (total ? segment * 100 : 0).toFixed(1);
};

export default ({ goodVotes, neutralVotes, badVotes }) => (
  <div>
    <h2>statistiikka</h2>
    <table>
      <tbody>
        <Statistic title="hyvä" value={goodVotes} />
        <Statistic title="neutraali" value={neutralVotes} />
        <Statistic title="huono" value={badVotes} />

        <Statistic
          title="keskiarvo"
          value={mean(goodVotes, neutralVotes, badVotes).toFixed(1)}
        />

        <Statistic
          title="positiivisia"
          value={`${positives(goodVotes, neutralVotes, badVotes)}%`}
        />
      </tbody>
    </table>
  </div>
);
