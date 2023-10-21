import axios from 'axios';

export interface iBlog {
  title: string;
  author: string;
  id?: string;
  url: string;
  likes?: number;
}

const baseUrl = 'http://localhost:3001/api/blogs';
let token = '';

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog: iBlog): Promise<iBlog> => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = (id: string, blogToUpdate: iBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, blogToUpdate);
  return request.then((response) => response.data);
};

export { getAllBlogs, setToken, createBlog, updateBlog };
