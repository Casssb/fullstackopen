import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

export interface iBlog {
  title: string;
  author: string,
  id: string
  url: string,
  likes: number
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export { getAll };
