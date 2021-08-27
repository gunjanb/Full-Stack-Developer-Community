import { gql } from "@apollo/client";
// for profile page; able to render all data(posts and video)
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
      tech {
        _id
        name
      }
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
//for home page; able to track down tech info and render back user
export const QUERY_USERS = gql`
  query {
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
        tech {
          _id
          name
        }
      }
    }
  }
`;

//for home page
export const QUERY_TECHS = gql`
query {
  techs {
      _id
      name
      users{
        _id
      }
    }
}
`;

export const QUERY_USER_ID = gql`
  query getUser($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      profilePic
      aboutMe
      contactInfo
    }
  }
`;

// export const QUERY_POST = gql`
// query {
//   post($_id:ID!) {
//       title
//       content
//       video
//       video_title
//       tech {
//         name
//     }
//   }
// }
// `;

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
