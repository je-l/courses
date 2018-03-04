const POSITIVE = 'votes/POSITIVE';
const NEUTRAL = 'votes/NEUTRAL';
const NEGATIVE = 'votes/NEGATIVE';

const defaultState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default (state = defaultState, action = {}) => {
  const { good, neutral, bad } = state;

  switch (action.type) {
    case POSITIVE:
      return { ...state, good: good + 1 };
    case NEUTRAL:
      return { ...state, neutral: neutral + 1 };
    case NEGATIVE:
      return { ...state, bad: bad + 1 };
    default:
      return state;
  }
};

export const positiveVote = () => {
  return { type: POSITIVE };
};

export const negativeVote = () => {
  return { type: NEGATIVE };
};

export const neutralVote = () => {
  return { type: NEUTRAL };
};
