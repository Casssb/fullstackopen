import { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import SingleAnecdote from './components/SingleAnecdote';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const handleClickAnecdote = (event, anecdoteId) => {
    event.preventDefault();
    navigate(`/anecdote/${anecdoteId}`);
  };

  const createNotificationMessage = (newMessage, secondsToLast) => {
    setNotification(newMessage);
    setTimeout(() => {
      setNotification('');
    }, secondsToLast);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p>{notification}</p>
      <Routes>
        <Route
          path="/"
          element={
            <AnecdoteList
              anecdotes={anecdotes}
              handleClickAnecdote={handleClickAnecdote}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateNew
              addNew={addNew}
              createNotificationMessage={createNotificationMessage}
            />
          }
        />
        <Route
          path="/anecdote/:id"
          element={<SingleAnecdote anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
