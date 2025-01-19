
const typeDefs = `
  type Book {
  authors: String
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
  
  type Query {
  helloWorld: String!}
`;

export default typeDefs;
