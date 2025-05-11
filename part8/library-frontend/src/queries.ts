import { gql } from '@apollo/client';

export const ALL_BOOKS_BY_AUTHOR_BY_GENRE = gql`
  query allBooksByAuthorAndGenre($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      author
      genres
      id
      published
      title
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;
