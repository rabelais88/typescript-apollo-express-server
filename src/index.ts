import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as resolvers from './resolver';
// import { importSchema } from 'graphql-import';
// const typeDefs = importSchema('src/schema/index.graphql');
import * as typeDefs from './schema';
import * as mongoose from 'mongoose';

const server = new ApolloServer({ typeDefs: typeDefs.default, resolvers: resolvers.default });

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useCreateIndex: true })

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);