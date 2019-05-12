import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as resolvers from './resolver';
// import { importSchema } from 'graphql-import';
// const typeDefs = importSchema('src/schema/index.graphql');
import * as typeDefs from './schema';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as Post from './model/Post';
const secretKey = '1234aaa';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
}

const sampleUser = {
  name: 'kim',
  age: 26
}

passport.use(new Strategy(jwtOpts, (jwtPayload, done) => {
  console.log(jwtPayload)
  // error => done(err, false)
  // success => done(null, user)
  // user not found => done(null, false)
  done(null, sampleUser);
}));

const context = ({req}) => ({
  Post,
  user: req.user,
  jwt,
  sampleUser,
  secretKey,
})

const server = new ApolloServer({
  typeDefs: typeDefs.default,
  resolvers: resolvers.default,
  context
});

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useCreateIndex: true })

const app = express();

app.use(server.graphqlPath, (req:any, res, next) => passport.authenticate('jwt', { session: false }, (err, user, info) => {
  if (user) {
    req.user = user;
  }
  next()
})(req, res, next));
/**
 * when testing, write down in Http headers as
 * { Authorization: "bearer ${token}"}
 */

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);