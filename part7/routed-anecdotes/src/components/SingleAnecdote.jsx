import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleAnecdote = ({ anecdotes }) => {
  const [chosenAnecdote, setChosenAnecdote] = useState('');
  const params = useParams();
  useEffect(() => {
    setChosenAnecdote(
      anecdotes.find((anecdote) => anecdote.id === Number(params.id)).content
    );
  }, []);
  return (
    <div>
      <p>{chosenAnecdote}</p>
    </div>
  );
};

export default SingleAnecdote;
