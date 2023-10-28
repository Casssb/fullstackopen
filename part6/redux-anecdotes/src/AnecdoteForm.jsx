import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!anecdote.trim()) {
      setError('please enter an anecdote');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setAnecdote('');
    dispatch(createAnecdote(anecdote));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <input
          type="text"
          name="anecdote"
          value={anecdote}
          onChange={(e) => setAnecdote(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
      <p>{error}</p>
    </form>
  );
};

export default AnecdoteForm;
