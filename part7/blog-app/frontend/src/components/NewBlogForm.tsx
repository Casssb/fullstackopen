import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { createBlog, getSingleBlog, iBlog } from '../services/blogs';
import { AxiosError } from 'axios';
import { setMessageAfterDelay } from '../utils/helper';
import { useNotificationDispatch } from '../NotificationContext';

interface NewBlogFormProps {
  setBlogs: Dispatch<SetStateAction<iBlog[]>>
}

const NewBlogForm = ({ setBlogs }: NewBlogFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();

  const handleCreateBlog = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      const successfullBlog = await createBlog(newBlog) as iBlog;
      const blogWithUserDetails = await getSingleBlog(successfullBlog.id as string)
      console.log(successfullBlog)
      const successString = `New blog added: ${successfullBlog.title} by ${successfullBlog.author}`;
      setBlogs(prevBlogs => [...prevBlogs, blogWithUserDetails]);
      dispatch && dispatch({type: 'SET_SUCCESS', payload: successString})
      setMessageAfterDelay(dispatch!,'RESET', 5000)
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch && dispatch({type: 'SET_ERROR', payload: error.message});
        setMessageAfterDelay(dispatch!,'RESET', 5000);
      }
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
            id='title'
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="author">author</label>
          <input
            className="pl-1"
            type="author"
            id='author'
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
            id='url'
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
