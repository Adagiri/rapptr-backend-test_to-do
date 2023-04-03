const path = require('path');
const dotenv = require('dotenv');

const { createServer } = require('http');

// Import graphql server tools
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');

// Set enviroment variables
dotenv.config({ path: './config/config.env' });

const app = require('./app');
const errorHandler = require('./middleware/error');
const contextHandler = require('./utils/context');

const { connectDB } = require('./config/db');

// Pull out all schemas and resolvers
const typesArray = loadFilesSync(path.join(__dirname, '**/*.gql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/resolvers/*.js'));

const PORT = process.env.PORT || 9000;

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const httpServer = createServer(app);

async function startApolloServer() {
  await connectDB();

  // Start apollo server
  const server = new ApolloServer({
    schema,
    context: contextHandler,
    csrfPrevention: true,
    formatError: errorHandler,
    introspection: true,
  });

  await server.start();

  let origin = ['https://studio.apollographql.com'];

  const corsOption = {
    credentials: true,
    origin,
  };

  server.applyMiddleware({ app, path: '/graphql', cors: corsOption });

  httpServer.listen(PORT, () => {
    console.log(`GRAPHQL SERVER RUNNING PORT: ${PORT} `);
  });
}

startApolloServer();

// Delete all resource except users & events _done_=============================
// Clear all unwanted functions on users & events ==============================
// Remove unnecessary things from server.js
// Remove unnecessary things from config/config.env
// Remove unnecessary packages
// Delete package-lock
