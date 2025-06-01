import type { Book } from './BookTable';
import { Button } from './ui/button';

type GenreFilterProps = {
  books: Book[];
  refetchFunc: (params?: object) => void;
};

const GenreFilter = ({ books, refetchFunc }: GenreFilterProps) => {
  const genreList = books.reduce((acc: string[], currentBook) => {
    currentBook.genres.forEach((genre) => acc.push(genre));
    return acc;
  }, []);

  const uniqueGenreList = [...new Set(genreList)];
  return (
    <div className='flex gap-1 ml-1'>
      {uniqueGenreList.map((genre) => (
        <Button key={genre} onClick={() => refetchFunc({ genre: genre })}>{genre}</Button>
      ))}
      <Button onClick={() => refetchFunc({ genre: undefined })}>All</Button>
    </div>
  );
};

export default GenreFilter;
