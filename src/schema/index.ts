import { gql } from 'apollo-server-express';
export default gql`
scalar DateTime

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
  now: DateTime!
}
type Mutation {
  addPost(title: String!, context: String!, file: String): Post!
}
`;