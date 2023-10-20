import { useEffect, useState } from 'react';
import { getAll } from './services/blogs';
import { iBlog } from './services/blogs';
import Blog from './components/Blog';

function App() {
  const [blogs, setBlogs] = useState<iBlog[]>([]);

  useEffect(() => {
    getAll().then((blogs: iBlog[]) => setBlogs(blogs));
  }, []);

  return (
    <>
      <h1>hello world</h1>
      {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </>
  );
}

export default App;
