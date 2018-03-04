import axios from 'axios';

const login = (username, password) => {
  return axios.post('/api/login', { username, password }).then(response => {
    return response.data;
  });
};

export default login;
