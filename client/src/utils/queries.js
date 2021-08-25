import { gql } from "@apollo/client";
// for profile page; able to render all data(posts and video)
export const QUERY_USER = gql`
query user {
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
  }
`;
//for home page; able to track down tech info and render back user
export const QUERY_USERS = gql`
  query users {
      _id
      username
      email
      profilePic
      aboutMe
      contactInfo
      posts {
        _id
        tech {
          _id
          name
        }
      }
    }
`;
//for home page
export const QUERY_TECHS = gql`
query tech {
      _id
      name
    }
`;
