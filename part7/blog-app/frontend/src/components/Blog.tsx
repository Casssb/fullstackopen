import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationDispatch } from '../NotificationContext';
import { useUserValue } from '../UserContext';
import {
  addBlogComment,
  deleteBlog,
  getSingleBlog,
  iBlog,
  updateBlogLikes,
} from '../services/blogs';
import { setMessageAfterDelay } from '../utils/helper';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useNotificationDispatch();
  const navigate = useNavigate();
  const user = useUserValue();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  if (!id) {
    return null;
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['singleBlog', id],
    queryFn: () => getSingleBlog(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const blog: iBlog = data;

  const updateLikesMutattion = useMutation({
    mutationFn: updateBlogLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['singleBlog'] });
    },
    onError: (err) => {
      dispatch({
        type: 'SET_ERROR',
        payload: `${err.message}`,
      });
      setMessageAfterDelay(dispatch!, 'RESET', 5000, '');
    },
  });

  const addBlogCommentMutation = useMutation({
    mutationFn: addBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['singleBlog'] });
    },
    onError: (err) => {
      dispatch({
        type: 'SET_ERROR',
        payload: `${err.message}`,
      });
      setMessageAfterDelay(dispatch!, 'RESET', 5000, '');
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs']) as iBlog[];
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((oldBlog) => oldBlog.id !== blog.id),
      );
    },
    onError: (err) => {
      dispatch({
        type: 'SET_ERROR',
        payload: `${err.message}`,
      });
      setMessageAfterDelay(dispatch!, 'RESET', 5000, '');
    },
  });

  const handleUpdateLikes = () => {
    const newLikes = {
      likes: blog!.likes! + 1,
    };
    updateLikesMutattion.mutate({ id: blog.id!, updatedBlogLikes: newLikes });
  };

  const handleAddComment = () => {
    addBlogCommentMutation.mutate({ id: blog.id!, comment: comment });
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteBlogMutation.mutate(blog.id!);
    }
  };

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="flex flex-col items-center">
      <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-3">
        <div className="flex flex-col pb-2">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            Title
          </dt>
          <dd className="text-lg font-semibold">{blog.title}</dd>
        </div>
        <div className="flex flex-col py-2">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            Author
          </dt>
          <dd className="text-lg font-semibold">{blog.author}</dd>
        </div>
        <div className="flex flex-col pt-2">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            URL
          </dt>
          <dd className="text-lg font-semibold">{blog.url}</dd>
        </div>
        <div className="flex flex-col pt-2">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            Likes
          </dt>
          <dd className="text-lg font-semibold">
            {blog.likes}{' '}
            <button
              onClick={() => handleUpdateLikes()}
              type="button"
              data-testid="likes-button"
              id="likes-button"
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
          </dd>
        </div>
      </dl>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
      >
        <input
          type="text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Comment
        </button>
      </form>
      <h2 className="text-lg font-semibold">Comments</h2>
      <ul className="flex flex-col items-center my-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {blog.comments &&
          blog.comments.map((comm, index) => <li key={index}>{comm}</li>)}
      </ul>
      <div className="flex">
        <>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm  p-2.5 text-center mr-2 mb-2"
          >
            Back
          </button>
        </>
        {blog.user?.username === user?.username && (
          <>
            <button
              onClick={() => {
                handleDeleteBlog(), navigate(-1);
              }}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm  p-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
