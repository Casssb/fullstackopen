import { iBlog } from '../services/blogs';

interface BlogProps {
  blog: iBlog;
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="bg-teal-100 flex flex-col justify-center items-center w-full p-2 gap-1">
      <div>{blog.title}</div>
      <h4>{blog.author}</h4>
      <h4>{blog.id}</h4>
      <h4>{blog.likes}</h4>
      <h4>{blog.url}</h4>
    </div>
  );
};

export default Blog;
