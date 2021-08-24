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

// add photo of user old
// export const UPLOAD_PHOTO = gql`
//   mutation uploadPhoto($file: Upload!) {
//     uploadPhoto(file: $file) {
//       _id
//       username
//       email
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

// new
export const UPDATE_PHOTO = gql`
  mutation updateUser($profilePic: file) {
    updateUser(profilePic: $profilePic) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      posts {
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

// update  aboutme  OLD ONE
// export const UPDATE_USER_ABOUT_ME = gql`
//   mutation updateUserAboutMe($aboutme: String!) {
//     updateUserAboutMe(aboutme: $aboutme) {
//       _id
//       username
//       email
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

//needed to update user about me latest
export const UPDATE_ABOUT_ME = gql`
  mutation updateUser($aboutMe: String) {
    updateUser(aboutMe: $aboutMe) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      posts {
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
  }
`;

//update  contact info of user creating the resource old
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

// new mutation for contact info
export const UPDATE_CONTACT_INFO = gql`
  mutation updateUser($contactInfo: String) {
    updateUser(contactInfo: $contactInfo) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      posts {
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

// video: String
// video_title: String;
// addpost
export const ADD_POST = gql`
  mutation addPost(
    $file: Upload!
    $title: String!
    $tech: String!
    $content: String!
    $video_title: String!
  ) {
    addPost(
      file: $file
      title: $title
      tech: $tech
      content: $content
      video_title: $video_title
    ) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      posts {
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
  }
`;
