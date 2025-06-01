import { ALL_BOOKS_BY_AUTHOR_BY_GENRE } from '@/queries';
import { useQuery } from '@apollo/client';
import { createFileRoute } from '@tanstack/react-router';
import AddBookDialog from '@/components/AddBookDialog';
import { useAuth } from '@/auth';
import GenreFilter from '@/components/GenreFilter';
import BookTable from '@/components/BookTable';

export const Route = createFileRoute('/Books')({
  component: Books,
});

function Books() {
  const { loading, error, data, refetch } = useQuery(
    ALL_BOOKS_BY_AUTHOR_BY_GENRE
  );
  const { isAuthenticated } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <BookTable books={data.allBooks} title='Books' />
      {isAuthenticated && (
        <GenreFilter books={data.allBooks} refetchFunc={refetch} />
      )}
      {isAuthenticated && <AddBookDialog />}
    </div>
  );
}
