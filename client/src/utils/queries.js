import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      username
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

export const QUERY_USERS = gql`
  {
    user {
      _id
      email
      username
      imgUrl
      aboutme
      contactme
      tech {
        _id
        name
      }
      resource {
        _id
        title
        videoUrl
        shortdescription
      }
    }
  }
`;

export const QUERY_TECHS = gql`
  {
    tech {
      _id
      name
    }
  }
`;

export const QUERY_RESOURCE = gql`
  query resource($_id: ID!) {
    resource(_id: $_id) {
      _id
      title
      shortdescription
      videoUrl
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
