import { SyntheticEvent, useState } from 'react';
import { iUser } from '../services/login';
import { login } from '../services/login';
import { AxiosError } from 'axios';
import { setToken } from '../services/blogs';

interface LoginFormProps {
  setUser(user: iUser): void;
}

const LoginForm = ({ setUser }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(`${error.response?.status}: incorrect username or password`);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="Username">Username</label>
          <input
            className="pl-1"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="Password">Password</label>
          <input
            className="pl-1"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          type="submit"
        >
          login
        </button>
      </form>
      <p className='text-red-700 p-2'>{error}</p>
    </div>
  );
};

export default LoginForm;
