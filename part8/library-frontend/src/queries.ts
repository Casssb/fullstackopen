import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      bookCount
      born
      id
      name
    }
    genres
    id
    published
    title
  }
`;

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    bookCount
    born
    id
    name
  }
`;

export const ALL_BOOKS_BY_AUTHOR_BY_GENRE = gql`
  query allBooksByAuthorAndGenre(
    $author: String
    $genre: String
    $filterOnUserFavGenre: Boolean
  ) {
    allBooks(
      author: $author
      genre: $genre
      filterOnUserFavGenre: $filterOnUserFavGenre
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;
