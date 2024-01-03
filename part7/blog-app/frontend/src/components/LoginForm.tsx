import { SyntheticEvent, useState } from 'react';
import { login } from '../services/login';
import { AxiosError } from 'axios';
import { setToken } from '../services/blogs';
import { setMessageAfterDelay } from '../utils/helper';
import { useNotificationDispatch } from '../NotificationContext';
import { useUserDispatch } from '../UserContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: 'SET_USER', payload: user });
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error instanceof AxiosError) {
        notificationDispatch({
          type: 'SET_ERROR',
          payload: `${error.response?.status}: incorrect username or password`,
        });
        setMessageAfterDelay(notificationDispatch, 'RESET', 5000, '');
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
          <label htmlFor="username">Username</label>
          <input
            className="pl-1"
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="password">Password</label>
          <input
            className="pl-1"
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          type="submit"
          id="login"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
