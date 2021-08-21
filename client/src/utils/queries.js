import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   {
//     user {
//       firstName
//       lastName
//       orders {
//         _id
//         purchaseDate
//         products {
//           _id
//           name
//           description
//           price
//           quantity
//           image
//         }
//       }
//     }
//   }
// `;

export const QUERY_USER = gql`
  {
    user {
      _id
      email
      stageName
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
        description
        resourceUrl
      }
    }
  }
`;
