import { useEffect, useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState<number[]>([]);

  const getRandAnecdote = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randIndex);
  };

  const handleVoteBtnClick = () => {
    const votesCpy = [...votes]
    votesCpy[selected] += 1
    setVotes(votesCpy)
  }

  const getAnecdoteWithMostVotes = () => {
    const highestVote = Math.max(...votes)
    const indexOfHighestVote = votes.indexOf(highestVote)
    return anecdotes[indexOfHighestVote]
  }

  useEffect(() => {
    const votesArray = new Array(anecdotes.length).fill(0);
    setVotes(votesArray);
  }, []);

  return (
    <div>
      <h2>Anecodteof the day</h2>
      <div>{anecdotes[selected]}</div>
      {votes.length && <div>has {votes[selected]} votes</div>}
      <div>
      <button onClick={() => getRandAnecdote()}>Change Anecdote</button>
      <button onClick={() => handleVoteBtnClick()}>Vote</button>
      </div>
      <div>
        <h2>anecodte with the most votes</h2>
        <p>{getAnecdoteWithMostVotes()}</p>
      </div>
    </div>
  );
};

export default App;
