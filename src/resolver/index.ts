// resolvers
import Post from '../model/Post';

export default {
  Query: {
    hello: () => 'Hello world!',
    posts: async () => await Post.find(),
    admin: async (parent, args, { user }, info) => {
      return user !== null && user !== undefined;
    },
    login: async (parent, args, { jwt, sampleUser, secretKey }, info) => {
      return jwt.sign(sampleUser, secretKey, { expiresIn: 60 }); // 1 minutes
    }
  },
  Mutation: {
    async addPost(root, args, context, info) {
      console.log('root', root, 'args', args, 'ctx', context, 'info', info);
      const post = await Post.create(args);
      return post;
    }
  }
}