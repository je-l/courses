import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAllAnecdotes = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const createNewAnecdote = async newAnecdote => {
  const { data } = await axios.post(baseUrl, newAnecdote);
  return data;
};

export const voteAnecdote = (id, newVotes) => {
  return axios.patch(`${baseUrl}/${id}`, { votes: newVotes });
};
