const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require("dotenv").config();

const ElectricityMapAPI = require('./datasources/electricity-map-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      electricityMapAPI: new ElectricityMapAPI(),
    };
  }
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `);
});
