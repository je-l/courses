import axios from 'axios';

const baseUrl = '/api/users';

export default () => {
  return axios.get(baseUrl).then(res => res.data);
};
