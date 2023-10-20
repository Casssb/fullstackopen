import { useEffect, useState } from 'react';
import { getAll } from './services/blogs';
import { iBlog } from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import { iUser } from './services/login';

function App() {
  const [blogs, setBlogs] = useState<iBlog[]>([]);
  const [user, setUser] = useState<iUser | null>(null);

  console.log(user)
  useEffect(() => {
    getAll().then((blogs: iBlog[]) => setBlogs(blogs));
  }, []);

  return (
    <div className="bg-slate-200 h-full flex flex-col gap-1 justify-center items-center">
      <h1 className="font-mono text-2xl p-2 font-bold">Blogs R Us</h1>
      <LoginForm setUser={setUser}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
