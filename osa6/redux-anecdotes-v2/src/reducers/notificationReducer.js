const createNotification = text => ({
  type: 'SET',
  text,
});

export const setNotification = (text, seconds) => dispatch => {
  dispatch(createNotification(text));
  setTimeout(() => dispatch(createNotification('')), seconds * 1000);
};

const initialState = '';

export default (store = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.text;
    default:
      return store;
  }
};
