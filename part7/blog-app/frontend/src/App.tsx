import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUserDispatch, useUserValue } from './UserContext';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import User from './components/User';
import UserList from './components/UserList';
import { getAllBlogs, setToken } from './services/blogs';

function App() {
  const dispatch = useUserDispatch();
  const user = useUserValue();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // console.log(JSON.parse(JSON.stringify(blogQuery)));

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: 'SET_USER', payload: user });
      setToken(user.token);
    }
  }, []);

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>blog off: {error.message}</div>;
  }

  return (
    <main className="bg-slate-200 h-full min-h-screen flex flex-col gap-1 justify-center items-center">
      <h1 className="font-mono mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Blogs R Us</h1>
      <Notification />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            index
            element={user ? <BlogList blogList={data} /> : <LoginForm />}
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
export default App;
