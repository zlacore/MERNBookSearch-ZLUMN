import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      password
    }
  }
}
`;

// Change: Removed username field and _id query on mutation
export const LOGIN_USER = gql`
  mutation Mutation($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token 
      user {
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
  saveBook(input: $input) {
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
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
       savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
    }
  }
`;