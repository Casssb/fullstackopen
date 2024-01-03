import { useEffect } from 'react';
import { getAllBlogs, setToken } from './services/blogs';
import { iBlog } from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LogOut from './components/LogOut';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { useUserDispatch, useUserValue } from './UserContext';

function App() {
  const dispatch = useUserDispatch();
  const user = useUserValue();

  const blogQuery = useQuery({
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

  if (blogQuery.isLoading) {
    return <div>loading data...</div>;
  }

  if (blogQuery.isError) {
    return <div>blog off</div>;
  }

  return (
    <main className="bg-slate-200 h-full min-h-screen flex flex-col gap-1 justify-center items-center">
      <h1 className="font-mono text-2xl p-2 font-bold">Blogs R Us</h1>
      <Notification />
      {user ? (
        <section className="flex flex-col items-center justify-center gap-1">
          <h3 className="p-1 font-semibold text-green-800">
            {user.name} logged in
          </h3>
          <Togglable action="new blog">
            <NewBlogForm />
          </Togglable>
          <LogOut />
          {blogQuery?.data
            .sort((a: iBlog, b: iBlog) => b.likes! - a.likes!)
            .map((blog: iBlog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </section>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
export default App;
