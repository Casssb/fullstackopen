import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { clearNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((elem) => elem.content.toLowerCase().includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    console.log('vote', id);
    dispatch(vote(id));
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
