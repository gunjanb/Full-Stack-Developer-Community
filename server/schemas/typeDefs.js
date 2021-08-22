const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    aboutMe: String
    profilePic: String
    contactInfo: String
    post: [Post]
  }

  type Post {
    title: String!
    content: String!
    video: String
    video_title: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addPost(
      title: String!
      content: String!
      video: String
      video_title: String
    ): Post

    deletePost(
      _id: ID!
    ): Post

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
