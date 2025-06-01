import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Author } from '@/routes/Authors';

export type Book = {
  author: Author;
  genres: string[];
  id: number;
  published: number;
  title: string;
};

type BookTableProps = {
  books: Book[];
  title: string
};

const BookTable = ({ books, title }: BookTableProps) => {
  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead className="text-right">Year Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book: Book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author.name}</TableCell>
            <TableCell>
              {book.genres?.length ? book.genres.join(', ') : 'Unkown'}
            </TableCell>
            <TableCell className="text-right">
              {book.published || 'Unkown'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
