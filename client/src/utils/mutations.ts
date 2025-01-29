import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    user {
      _id
      username
      email
      password
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!, $email: String) {
    login(username: $username, password: $password, email: $email) {
      token 
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation($book: BookInput!) {
  saveBook(book: $book) {
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
    username
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($book: String) {
    deleteBook(book: $book) {
      book
    }
  }
`;