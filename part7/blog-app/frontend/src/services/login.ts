import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

interface iCredentials {
  username: string;
  password: string;
}

const login = async (credentials: iCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export { login };
