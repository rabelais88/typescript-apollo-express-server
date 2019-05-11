// resolvers
import Post from '../model/Post';

export default {
  Query: {
    hello: () => 'Hello world!',
    posts: async () => await Post.find()
  },
  Mutation: {
    async addPost(root, args, context, info) {
      console.log('root', root, 'args', args, 'ctx', context, 'info', info);
      const post = await Post.create(args);
      return post;
    }
  }
}