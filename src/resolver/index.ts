// resolvers
import Post from '../model/Post';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
  Query: {
    hello: () => 'Hello world!',
    posts: async () => await Post.find(),
    admin: async (parent, args, { user }, info) => {
      return user !== null && user !== undefined;
    },
    login: async (parent, args, { jwt, sampleUser, secretKey }, info) => {
      return jwt.sign(sampleUser, secretKey, { expiresIn: 60 }); // 1 minutes
    },
    now() {
      return new Date();
    }
  },
  Mutation: {
    async addPost(root, args, context, info) {
      console.log('root', root, 'args', args, 'ctx', context, 'info', info);
      const post = await Post.create(args);
      return post;
    }
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'custom date and time',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value to client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
}