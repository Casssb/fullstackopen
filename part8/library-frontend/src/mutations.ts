import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, BOOK_DETAILS } from './queries';

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn($setBornTo: Int, $name: String) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
