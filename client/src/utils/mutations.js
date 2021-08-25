import { gql } from "@apollo/client";

//login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//signup
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// add photo of user
export const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      _id
      username
      email
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

//add video
// export const UPLOAD_VIDEO = gql`
//   mutation uploadVideo($file: Upload!) {
//     uploadVideo(file: $file) {
//       _id
//       username
//       email
//       username
//       imgUrl
//       aboutme
//       contactme
//       tech {
//         _id
//         name
//       }
//       resource {
//         _id
//         title
//         videoUrl
//         shortdescription
//       }
//     }
//   }
// `;

// update technology
export const UPDATE_TECH = gql`
  mutation updateUserTech($tech: [ID]!) {
    updateUserTech(tech: $tech) {
      _id
      username
      email
      aboutme
      contactme
      tech {
        _id
        name
      }
    }
  }
`;

// update  aboutme
export const UPDATE_USER_ABOUT_ME = gql`
  mutation updateUserAboutMe($aboutme: String!) {
    updateUserAboutMe(aboutme: $aboutme) {
      _id
      username
      email
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

//update  contact info of user creating the resource
export const UPDATE_USER_CONTACT = gql`
  mutation updateUserContact($contactInfo: String!) {
    updateUserContact(contactInfo: $contactInfo) {
      _id
      username
      email
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

export const UPDATE_USER_RESOURCE = gql`
  mutation updateUserResource(
    $file: Upload!
    $title: String!
    $shortdescription: String!
  ) {
    updateUserResource(
      file: $file
      title: $title
      shortdescription: $shortdescription
    ) {
      _id
      username
      email
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

export const ADD_ORDER = gql`
  mutation addOrder($contributions: [ID]!) {
    addOrder(contributions: $contributions) {
      purchaseDate
      contributions {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;
