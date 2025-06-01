import type { Book } from '@/components/BookTable';

export const uniqByTitle = (books: Book[]) => {
  const seen = new Set();
  return books.filter((book: Book) => {
    const title = book.title;
    return seen.has(title) ? false : seen.add(title);
  });
};
