import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ?
  '/api' :
  'http://localhost:3001/api';


const getAll = () => (
  axios.get(`${API_URL}/persons`)
);

const create = newPerson => (
  axios.post(`${API_URL}/persons`, newPerson)
);

const deleteOne = id => (
  axios.delete(`${API_URL}/persons/${id}`)
);

const update = (id, newPerson) => (
  axios.put(`${API_URL}/persons/${id}`, newPerson)
);

export default {
  getAll, create, deleteOne, update,
};
