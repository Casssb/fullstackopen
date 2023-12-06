const AnecdoteList = ({ anecdotes, handleClickAnecdote }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <button onClick={(e) => handleClickAnecdote(e, anecdote.id)}>
              {anecdote.content}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
