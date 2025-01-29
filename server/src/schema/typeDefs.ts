
const typeDefs = `
  type Book {
    BookId: Int!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  input BookInput {
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String
  }
  type Auth {
    token: String
    user: User
  }

  type Query {
    helloWorld: String
    me: User
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

export default typeDefs;
