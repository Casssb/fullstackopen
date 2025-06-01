import { ALL_AUTHORS } from '@/queries';
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
import AuthorSelect from '@/components/AuthorSelect';
import { useAuth } from '@/auth';

export const Route = createFileRoute('/Authors')({
  component: Authors,
});

export type Author = {
  name: string;
  id: string;
  born: number;
  bookCount: number;
};

function Authors() {
  const result = useQuery(ALL_AUTHORS);
  const { isAuthenticated } = useAuth();

  if (result.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Table>
        <TableCaption>Authors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Year Born</TableHead>
            <TableHead className="w-[100px]">Book Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.allAuthors.map((author: Author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium">{author.name}</TableCell>
              <TableCell>{author.born ?? 'Unkown'}</TableCell>
              <TableCell>{author.bookCount || 'Unkown'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isAuthenticated && (
        <AuthorSelect
          authors={result.data.allAuthors.map((author: Author) => author.name)}
        />
      )}
    </div>
  );
}
