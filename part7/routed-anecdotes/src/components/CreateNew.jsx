import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew, createNotificationMessage }) => {
  const {reset: resetContent, ...content} = useField('text');
  const {reset: resetAuthor, ...author} = useField('text');
  const {reset: resetInfo, ...info} = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    createNotificationMessage(`A new anecdote "${content.value}" created!`, 5000);
    navigate('/');
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} required />
        </div>
        <div>
          author
          <input {...author} required />
        </div>
        <div>
          url for more info
          <input {...info} required />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
