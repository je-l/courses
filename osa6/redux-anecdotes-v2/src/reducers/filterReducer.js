const initialState = '';

export const setFilter = term => ({
  type: 'SET_FILTER',
  filter: term,
});

export default (store = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return store;
  }
};
