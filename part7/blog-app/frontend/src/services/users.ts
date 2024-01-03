import axios from 'axios';
import { iBlog } from './blogs';
const baseUrl = 'http://localhost:3001/api/users';

export interface iUser {
  id: string;
  username: string;
  name: string;
  token: string;
  blogs: iBlog[];
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export { getAllUsers };
