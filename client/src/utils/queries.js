import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;

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
