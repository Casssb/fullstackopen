import { iBlog } from '../services/blogs';

interface BlogProps {
  blog: iBlog;
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="bg-zinc-100 flex flex-col justify-center items-center w-full p-2 gap-1">
      <h2 className="font-bold">{blog.title}</h2>
      <h4 className="italic">{blog.author}</h4>
      {/* <h4>{blog.id}</h4> */}
      <p className="font-medium">Likes: {blog.likes}</p>
      <p>{blog.url}</p>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Delete
      </button>
    </div>
  );
};

export default Blog;
