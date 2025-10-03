import EntryList from './components/EntryList';
import { useGetDiaries } from './services/diaryService';

const App = () => {
  const { data, error, loading } = useGetDiaries();
  console.log(data, error, loading);
  return (
    <div className="w-full h-full flex justify-center">
      <EntryList title="Diary Entries" />
    </div>
  );
};

export default App;
