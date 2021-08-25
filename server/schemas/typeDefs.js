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
    posts: [Post]

  }

  type Tech {
    _id: ID
    name: String
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    content: String
    video: String
    video_title: String
    tech: Tech
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID!): User
    post(_id: ID!): Post
    tech(_id: ID!): Tech
    posts: [Post]
    users: [User]
    techs: [Tech]
  }

  type Mutation {

    addTech(
      postId: ID!,
      name: String!
    ): Post

    addPost(
      title: String!,
      content: String!,
      video: String,
      video_title: String
    ): User

    deletePost(
      postId: ID!
    ): User

    addUser(
      username: String!,
      email: String!,
      password: String!
    ): Auth

    updateUser(
      aboutMe: String,
      profilePic: String,
      contactInfo: String,
    ): User

    login(
      email: String!,
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;
