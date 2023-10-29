import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Too short. Anecdote must be at least 5 characters',
      });
      setTimeout(() => {
        dispatch({ type: 'RESET_NOTIFICATION' });
      }, 2000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `New anecdote added: ${content}`,
    });
    event.target.anecdote.value = '';
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' });
    }, 2000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
