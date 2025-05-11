import { ALL_BOOKS_BY_AUTHOR_BY_GENRE } from '@/queries';
import { useQuery } from '@apollo/client';
import { createFileRoute } from '@tanstack/react-router';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AddBookDialog from '@/components/AddBookDialog';

export const Route = createFileRoute('/Books')({
  component: Books,
});

type Book = {
  author: string;
  genres: string[];
  id: number;
  published: number;
  title: string;
};

function Books() {
  const result = useQuery(ALL_BOOKS_BY_AUTHOR_BY_GENRE);

  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log(result);
  return (
    <div>
      <Table>
        <TableCaption>Books</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead className="text-right">Year Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.allBooks.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genres?.length ? book.genres.join(', ') : 'Unkown'}</TableCell>
              <TableCell className="text-right">
                {book.published || 'Unkown'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddBookDialog/>
    </div>
  );
}
