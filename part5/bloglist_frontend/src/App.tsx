import { useEffect, useState } from 'react';
import { getAllBlogs, setToken } from './services/blogs';
import { iBlog } from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import { iUser } from './services/login';
import LogOut from './components/LogOut';
import NewBlogForm from './components/NewBlogForm';

function App() {
  const [blogs, setBlogs] = useState<iBlog[]>([]);
  const [user, setUser] = useState<iUser | null>(null);

  console.log(user);
  useEffect(() => {
    getAllBlogs().then((blogs: iBlog[]) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  return (
    <div className="bg-slate-200 h-full flex flex-col gap-1 justify-center items-center">
      <h1 className="font-mono text-2xl p-2 font-bold">Blogs R Us</h1>
      {user ? (
        <div className='flex flex-col items-center justify-center'>
          <h3 className='p-1 font-semibold text-green-800'>{user.name} logged in</h3>
          <NewBlogForm setBlogs={setBlogs}/>
          <LogOut setUser={setUser}/>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
