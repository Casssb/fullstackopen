import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

interface iCredentials {
    username: string,
    password: string
}

export interface iUser {
    username: string,
    name: string,
    token: string
}

export const login = async (credentials: iCredentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  }
  
