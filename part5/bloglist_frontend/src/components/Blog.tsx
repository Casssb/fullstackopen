import { Dispatch, SetStateAction, useState } from 'react';
import {
  deleteBlog,
  getSingleBlog,
  iBlog,
  updateBlogLikes,
} from '../services/blogs';
import { iUser } from '../services/login';
import { AxiosError } from 'axios';
import { setMessageAfterDelay } from '../utils/helper';

interface BlogProps {
  blog: iBlog;
  user: iUser;
  setBlogs: Dispatch<SetStateAction<iBlog[]>>;
}

const Blog = ({ blog, user, setBlogs }: BlogProps) => {
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateLikes = async () => {
    try {
      const blogToUpdate = await getSingleBlog(blog.id!);
      const newLikes = {
        likes: blogToUpdate.likes + 1,
      };
      const updatedBlog = await updateBlogLikes(blog.id!, newLikes);
      console.log(updatedBlog)
      setBlogs((prevState) =>
        prevState.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
        setMessageAfterDelay(setError, '', 5000);
      }
    }
  };

  const handleDeleteBlog = async () => {
    try {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
        await deleteBlog(blog.id!);
        setBlogs((prevState) =>
          prevState.filter((oldBlog) => oldBlog.id !== blog.id)
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
        setMessageAfterDelay(setError, '', 5000);
      }
    }
  };
  return (
    <div className="bg-zinc-100 flex flex-col justify-center items-center w-full p-2 gap-1">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className="font-bold">{blog.title}</h2>
        <button
          onClick={() => setShowContent(!showContent)}
          type="button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {showContent ? 'hide' : 'show'}
        </button>
      </div>
      {showContent && (
        <>
          <h4 className="italic">{blog.author}</h4>
          <div className="flex justify-center items-center gap-2">
            <p className="font-medium">Likes: {blog.likes}</p>
            <button
              onClick={() => handleUpdateLikes()}
              type="button"
              data-testid="likes-button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
            <p>{error}</p>
          </div>
          <p>{blog.url}</p>
          {blog.user && <p>Added by: {blog.user.username}</p>}
        </>
      )}
      {blog.user?.username === user.username && (
        <>
          <button
            onClick={() => handleDeleteBlog()}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm  p-2.5 text-center mr-2 mb-2"
          >
            Delete
          </button>
          <p>{error}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
