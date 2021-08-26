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
    users: [User]
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

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Query {
    user(_id: ID): User
    post(_id: ID!): Post
    tech(_id: ID!): Tech
    posts: [Post]
    users: [User]
    techs: [Tech]
    products(name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
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
      username: String,
      email: String,
      password: String, 
      aboutMe: String,
      profilePic: String,
      contactInfo: String,
    ): User

    login(
      email: String!,
      password: String!
    ): Auth
    
    addOrder(
      products: [ID]!
    ): Order

    updateProduct(
      _id: ID!,
      quantity: Int!
    ): Product
  }
`;

module.exports = typeDefs;
