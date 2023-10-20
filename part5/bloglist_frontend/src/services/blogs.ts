import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

export interface iBlog {
  title: string;
  author: string,
  id?: string
  url: string,
  likes?: number
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

export { getAll };
