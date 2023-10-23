import axios from 'axios';

interface iBlogUser {
  id: string;
  name: string;
  username: string;
  blogs: string[];
}

interface iBlogLikes {
  likes: number;
}

export interface iBlog {
  title: string;
  author: string;
  id?: string;
  url: string;
  likes?: number;
  user?: iBlogUser;
}

const baseUrl = 'http://localhost:3001/api/blogs';
let token = '';

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const createConfig = (jwtToken: string) => {
  return {
    headers: { Authorization: jwtToken },
  };
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingleBlog = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createBlog = async (newBlog: iBlog): Promise<iBlog> => {
  const config = createConfig(token);

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const deleteBlog = async (id: string) => {
  const config = createConfig(token);
  await axios.delete(`${baseUrl}/${id}`, config);
};

const updateBlogLikes = (id: string, updatedBlogLikes: iBlogLikes) => {
  const config = createConfig(token);
  const request = axios.put(`${baseUrl}/${id}`, updatedBlogLikes, config);
  return request.then((response) => response.data);
};

export {
  getAllBlogs,
  getSingleBlog,
  setToken,
  createBlog,
  updateBlogLikes,
  deleteBlog,
};
