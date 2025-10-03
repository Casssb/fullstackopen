import { useGetDiaries } from '../services/diaryService';
import Entry from './Entry';

type EntryListProps = {
  title: string;
};

const EntryList = ({ title }: EntryListProps) => {
  const { data, error, loading } = useGetDiaries();
  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-bold text-2xl text-cyan-600">{title}</p>
      {loading && <p>...loading</p>}
      {error && <p>{error}</p>}
      {!loading && !error && data?.map((entry) => <Entry entry={entry} />)}
    </div>
  );
};

export default EntryList;
