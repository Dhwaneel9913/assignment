
// mongoose.connect('mongodb+srv://dhwaneel9913:dhwaneel9913.@cluster0.xe8d5s1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Import your typeDefs and resolvers
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://dhwaneel9913:123@cluster0.xe8d5s1.mongodb.net/Assignment?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the server and then apply middleware
(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();

