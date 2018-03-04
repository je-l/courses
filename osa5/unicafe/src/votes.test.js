import deepFreeze from 'deep-freeze';
import counterReducer, { positiveVote } from './votes.duck';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  it(
    'should return a proper initial state ' +
      'when called with undefined state',
    () => {
      const action = {
        type: 'DO_NOTHING',
      };

      const newState = counterReducer(undefined, action);
      expect(newState).toEqual(initialState);
    },
  );

  it('good is incremented', () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, positiveVote());
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0,
    });
  });
});
