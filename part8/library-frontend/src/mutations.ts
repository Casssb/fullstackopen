import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      author
      genres
      id
      published
      title
    }
  }
`;

export const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn($setBornTo: Int, $name: String) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      bookCount
      born
      id
      name
    }
  }
`;
