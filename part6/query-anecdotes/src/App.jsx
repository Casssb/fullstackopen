import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { NotificationContextProvider } from './NotificationContext';

const App = () => {
  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </NotificationContextProvider>
  );
};

export default App;
