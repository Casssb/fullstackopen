import { useDispatch, useSelector } from 'react-redux';
import { handleVote } from '../reducers/anecdoteReducer';
import { createTempNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((elem) => elem.content.toLowerCase().includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const submitVote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(handleVote(anecdote));
    dispatch(createTempNotification(anecdote.content, 2));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => submitVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
