import React from 'react';
import { connect } from 'react-redux';

const mean = (good, bad, sum) => {
  const avg = (good * 1 + bad * -1) / sum;

  return avg.toFixed(1);
};

const positives = (good, neutral, sum) => {
  const percentage = good / sum * 100;

  return percentage.toFixed(1);
};

const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad;

  if (totalVotes === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  const sum = good + neutral + bad;

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{mean(good, bad, sum)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives(good, neutral, sum)} %</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div>
  );
};

const mapStateToProps = state => {
  const { good, neutral, bad } = state;

  return { good, neutral, bad };
};

export default connect(mapStateToProps)(Statistics);
