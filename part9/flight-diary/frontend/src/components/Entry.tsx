import type { DiaryEntry } from '../types';

type DiaryEntryProps = {
  entry: DiaryEntry;
};

const Entry = ({ entry }: DiaryEntryProps) => {
  return (
    <div key={entry.id}>
      <p className='font-mono font-bold'>{entry.date}</p>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </div>
  );
};

export default Entry;
