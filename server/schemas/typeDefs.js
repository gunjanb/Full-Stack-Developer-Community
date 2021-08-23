const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    aboutMe: String
    profilePic: String
    contactInfo: String
    post: [Post]
  }

  type Post {
    _id: ID
    title: String
    content: String
    tech: String
    video: String
    video_title: String
    user: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    post: Post
    all_user: User
  }

  type Mutation {
    addPost(
      title: String!
      content: String!
      video: String
      video_title: String
    ): User

    deletePost(
      postId: ID!
    ): User

    addUser(
      username: String!
      email: String!
      password: String!
      aboutMe: String
      profilePic: String
      contactInfo: String
    ): Auth

    updateUser(
      aboutMe: String
      profilePic: String
      contactInfo: String
    ): User

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
