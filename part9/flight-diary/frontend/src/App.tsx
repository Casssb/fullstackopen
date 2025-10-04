import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { useGetDiaries } from './services/diaryService';

const App = () => {
  const { data, error, loading } = useGetDiaries();
  console.log(data, error, loading);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <EntryForm/>
      <EntryList title="Diary Entries" />
    </div>
  );
};

export default App;
