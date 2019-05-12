import { gql } from 'apollo-server-express';
export default gql`
  type Post {
    id: ID!
    title: String!
    context: String!
    file: String
  }

  type Query {
    hello: String
    posts: [Post]!
    admin: Boolean!
    login: String!
  }
  type Mutation {
    addPost(title: String!, context: String!, file: String): Post!
  }
`;