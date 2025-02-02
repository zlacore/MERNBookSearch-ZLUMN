import express from 'express';
// TODO: Uncomment the following code once you have built the queries and mutations in the client folder
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
// import { Context } from 'vm';

// TODO: Uncomment the following code once you have built the queries and mutations in the client folder
const PORT = process.env.PORT || 3001
const app = express()
import { typeDefs, resolvers } from './schema/index.js';
import db from './config/connection.js';
import { authenticateToken } from './services/auth.js';

import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Uncomment the following code once you have built the queries and mutations in the client folder

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

// TODO: Uncomment the following code once you have built the queries and mutations in the client folder
const startApolloServer = async () => {
  await server.start();
  await db()

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // TODO: Uncomment the following code once you have built the queries and mutations in the client folder
  app.use('/graphql', expressMiddleware(server as any
    ,{
      context: authenticateToken
    },
  ));

  // console.log(authenticateToken.name)

  // if we're in production, serve client/dist as static assets
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, '../client/dist')));

  //   // TODO: Uncomment this code once you have built out queries and mutations in the client folder
  //   app.get('*', (_req, res) => {
  //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //   });
  // }

  const address = path.join(__dirname, '../../client/dist');
    console.log("address!", address);
    app.use(express.static(address));


    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  // TODO: Uncomment this code once you have built out queries and mutations in the client folder
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};



//TODO: Uncomment the following code once you have built the queries and mutations in the client folder
startApolloServer();
