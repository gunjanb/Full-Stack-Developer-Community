import { gql } from "@apollo/client";

export const QUERY_TECHS = gql`
  {
    techs {
      _id
      name
    }
  }
`;
export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
      profilePic
      aboutMe
      contactInfo
      posts {
        _id
        title
        video
        video_title
        content
      }
      techs {
        _id
        name
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      content
      video
      video_title
      tech {
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  query {
    products {
      _id
      name
      description
      price
      quantity
      image
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  query {
    user {
      _id
      username
      email
      profilePic
      aboutMe
      contactInfo
      posts {
        _id
        title
        video
        video_title
      }
      techs {
        _id
        name
      }
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
