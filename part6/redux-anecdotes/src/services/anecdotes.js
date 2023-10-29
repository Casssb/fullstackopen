import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0,
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getIndividual = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNew = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (anecdote) => {
  const putUrl = `${baseUrl}/${anecdote.id}`;
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(putUrl, updatedAnecdote);
  return response.data;
};

export { getAll, createNew, getIndividual, update };
