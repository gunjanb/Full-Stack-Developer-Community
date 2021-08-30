const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Upload

  type Tech {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    email: String
    aboutMe: String
    profilePic: String
    contactInfo: String
    techs: [Tech]
    posts: [Post]
    orders: [Order]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
  }

  type Checkout {
    session: ID
  }

  type Post {
    _id: ID
    title: String
    video: String
    video_title: String
    content: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    techs: [Tech]
    users: [User]
    user(_id: ID!): User
    products(name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }
  type Mutation {
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateaboutme(aboutMe: String): User
    updatetech(techs: [ID]!): User
    updatecontactinfo(contactInfo: String): User
    updatepost(
      title: String
      content: String
      file: Upload
      video_title: String
    ): User
    uploadprofilepic(file: Upload!): User
  }
`;

module.exports = typeDefs;
