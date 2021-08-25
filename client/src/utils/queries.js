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
    users {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      posts {
        title
        video_title
        _id
        tech {
          _id
          name
        }
        content
        video
      }
    }
  }
`;

export const QUERY_TECHS = gql`
  {
    techs {
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
