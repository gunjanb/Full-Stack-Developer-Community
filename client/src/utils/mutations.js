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

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      posts {
        title
        _id
      }
    }
  }
`;

// add post THEN attach tech to post ******
//need to test if it will return a single post._id associated with the new post; if it returns all posts._id, then we have to use post.content for update_tech instead of post._id
export const CREATE_POST = gql`
  mutation addPost(
    $title: String!
    $content: String!
    $video_title: String
    $video: String
  ) {
    addPost(
      title: $title
      content: $content
      video: $video
      video_title: $video_title
    ) {
      posts {
        _id
      }
    }
  }
`;

// the posts {_id} will be used for update_tech *******
export const UPDATE_TECH = gql`
  mutation addTech($name: String!, $postId: ID!) {
    addTech(name: $name, posId: $postId) {
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

// update userinfo including aboutMe, profilePic, and contactInfo
export const UPDATE_PROFILE = gql`
  mutation updateUser(
    $aboutMe: String
    $profilePic: String
    $contactInfo: String
  ) {
    updateUser(
      aboutMe: $aboutMe
      profilePic: $profilePic
      contactInfo: $contactInfo
    ) {
      _id
      username
      email
      profilePic
      aboutMe
      contactMe
      posts {
        _id
        video
        video_title
        title
        content
        tech {
          _id
          name
        }
      }
    }
  }
`;

// export const UPDATE_USER_RESOURCE = gql`
//   mutation updateUserResource(
//     $file: Upload!
//     $title: String!
//     $shortdescription: String!
//   ) {
//     updateUserResource(
//       file: $file
//       title: $title
//       shortdescription: $shortdescription
//     ) {
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

// // add photo of user
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
        video
        video_title
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

// export const UPDATE_USER_RESOURCE = gql`
//   mutation updateUserResource(
//     $file: Upload!
//     $title: String!
//     $shortdescription: String!
//   ) {
//     updateUserResource(
//       file: $file
//       title: $title
//       shortdescription: $shortdescription
//     ) {
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

// // add photo of user
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
