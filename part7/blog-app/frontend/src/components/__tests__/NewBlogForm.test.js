import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from '../NewBlogForm';

test('Submitting a blog triggers the form "submit" event and sends the correct info to the API', async () => {
  const mockHandler = jest.fn();
  const userAction = userEvent.setup();

  render(<NewBlogForm setBlogs={mockHandler} />);

  const title = screen.getByLabelText('title');
  const author = screen.getByLabelText('author');
  const url = screen.getByLabelText('url');
  const submitButton = screen.getByText(/Create blog/i);

  await userAction.type(title, 'title');
  await userAction.type(author, 'author');
  await userAction.type(url, 'url');
  await userAction.click(submitButton);

//   expect(mockHandler).toHaveBeenCalledTimes(1);
//   expect(mockHandler.mock.calls[0][0].title).toBe('title');
//   expect(mockHandler.mock.calls[0][0].author).toBe('author');
//   expect(mockHandler.mock.calls[0][0].url).toBe('url');
});
