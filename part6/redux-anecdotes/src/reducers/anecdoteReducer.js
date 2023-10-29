import { createSlice } from '@reduxjs/toolkit';
import { createNew, getAll, update } from '../services/anecdotes';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const anecdoteWithVote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === anecdoteWithVote.id ? anecdoteWithVote : anecdote
      );
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const handleVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteWithVote = await update(anecdote);
    dispatch(vote(anecdoteWithVote));
  };
};

export default anecdoteSlice.reducer;
