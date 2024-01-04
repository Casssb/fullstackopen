import { iBlog } from '../services/blogs';
import { useNavigate } from 'react-router-dom';

interface BlogProps {
  blog: iBlog;
}

const BlogListElem = ({ blog }: BlogProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-100 flex flex-col justify-center items-center w-full p-2 gap-1">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className="font-bold">{blog.title}</h2>
        <button
          onClick={() => navigate(`blogs/${blog.id}`)}
          type="button"
          data-test-id="show-button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default BlogListElem;
