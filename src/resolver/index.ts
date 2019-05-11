// resolvers
import Post from '../model/Post';

export default {
  Query: {
    hello: () => 'Hello world!',
    posts: async () => await Post.find()
  },
  Mutation: {
    addPost(root: any, args: any, context: any) {
      console.log(root, args, context);
      return root.posts();
    }
  }
}