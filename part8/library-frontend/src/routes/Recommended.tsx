import { ALL_BOOKS_BY_AUTHOR_BY_GENRE } from '@/queries';
import { useQuery } from '@apollo/client';
import { createFileRoute } from '@tanstack/react-router';
import BookTable from '@/components/BookTable';
import { useAuth } from '@/auth';

export const Route = createFileRoute('/Recommended')({
  component: Recommended,
});

function Recommended() {
  const { isAuthenticated } = useAuth();
  const { loading, error, data } = useQuery(ALL_BOOKS_BY_AUTHOR_BY_GENRE, {
    variables: { filterOnUserFavGenre: true },
  });

  if (!isAuthenticated) {
    return <div>You must sign in to view recommended books</div>
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <BookTable books={data.allBooks} title="Recommended Books" />
    </div>
  );
}
