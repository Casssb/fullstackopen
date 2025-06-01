import { ALL_BOOKS_BY_AUTHOR_BY_GENRE } from '@/queries';
import { BOOK_ADDED } from '@/subscriptions';
import { uniqByTitle } from '@/utils/book.utils';
import { useSubscription } from '@apollo/client';
import { toast } from 'sonner';
import type { Book } from './BookTable';
import { Toaster } from './ui/sonner';

const Notifier = () => {
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded: Book = data.data.bookAdded;
      toast.success(`${bookAdded.title} added`, {
        description: `Author: ${bookAdded.author.name}`,
        action: {
          label: 'Close',
          onClick: () => console.log('Close'),
        },
      });
      client.cache.updateQuery(
        { query: ALL_BOOKS_BY_AUTHOR_BY_GENRE },
        ({ allBooks }) => {
          return {
            allBooks: uniqByTitle(allBooks.concat(bookAdded)),
          };
        }
      );
      console.log(bookAdded);
    },
  });
  return <Toaster />;
};

export default Notifier;
