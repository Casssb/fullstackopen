import { SyntheticEvent, useState } from 'react';
import { createBlog } from '../services/blogs';
import { setMessageAfterDelay } from '../utils/helper';
import { useNotificationDispatch } from '../NotificationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const handleCreateBlog = (e: SyntheticEvent) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    newBlogMutation.mutate(newBlog);
    const successString = `New blog added: ${newBlog.title} by ${newBlog.author}`;
    dispatch && dispatch({ type: 'SET_SUCCESS', payload: successString });
    setMessageAfterDelay(dispatch!, 'RESET', 5000);
    if (newBlogMutation.isError) {
      dispatch &&
        dispatch({ type: 'SET_ERROR', payload: newBlogMutation.error.message });
      setMessageAfterDelay(dispatch!, 'RESET', 5000);
    }
  };
  return (
    <div>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={(e) => handleCreateBlog(e)}
      >
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="title">title</label>
          <input
            className="pl-1"
            type="text"
            value={title}
            name="title"
            id="title"
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="author">author</label>
          <input
            className="pl-1"
            type="author"
            id="author"
            value={author}
            name="author"
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="url">url</label>
          <input
            className="pl-1"
            type="text"
            id="url"
            value={url}
            name="url"
            required
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          type="submit"
        >
          Create blog
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
