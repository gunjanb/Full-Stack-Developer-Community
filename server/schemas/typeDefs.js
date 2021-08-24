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
    orders: [Order]
  }

  type Checkout {
    session: ID
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

  type Contribution {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    contributions: [Contribution]
  }

  type Query {
    user(_id: ID!): User
    post(_id: ID!): Post
    tech(_id: ID!): Tech
    posts: [Post]
    users: [User]
    techs: [Tech]
    contributions(name: String): [Contribution]
    contribution(_id: ID!): Contribution
    order(_id: ID!): Order
    checkout(contributions: [ID]!): Checkout
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
    
    addOrder(
      contributions: [ID]!
    ): Order

    updateContribution(
      _id: ID!, quantity: Int!
    ): Contribution
  }
`;

module.exports = typeDefs;
