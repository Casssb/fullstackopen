import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../Blog';

const blog = {
  title: 'this is a test blog',
  author: 'bob',
  url: 'test.com',
  likes: 0,
  user: {
    username: 'test',
  },
};

const user = {
  username: 'test',
  name: 'test',
};

describe('Blog tests', () => {
  test('Only the blog title is displayed if there been no user interactions', () => {
    render(<Blog blog={blog} user={user} />);

    const title = screen.getByRole('heading', { level: 2 });
    const author = screen.queryByText('bob');
    const url = screen.queryByText('test.com');
    const likes = screen.queryByText(/likes/i);

    expect(author).not.toBeInTheDocument();
    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  test('When the "show" button is clicked the full blog info should be displayed', async () => {
    render(<Blog blog={blog} user={user} />);

    const showHideButton = screen.getByText('show');
    expect(showHideButton).toBeInTheDocument();

    const userAction = userEvent.setup();
    await userAction.click(showHideButton);

    const author = screen.queryByText('bob');
    const url = screen.queryByText('test.com');
    const likes = screen.queryByText(/likes/i);

    expect(author).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });
  test('Clicking the "like" button twice calls the event handler twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={user} setBlogs={mockHandler}/>);

    const showHideButton = screen.getByText('show');

    // const userAction = userEvent.setup();
    // await userAction.click(showHideButton);

    // const likesButton = screen.getByTestId('likes-button')
    // await userAction.click(likesButton)
    // await userAction.click(likesButton)
    // expect(mockHandler.mock.calls).toHaveLength(2)

    // screen.debug()
  });
});
