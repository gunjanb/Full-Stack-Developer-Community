import { gql } from "@apollo/client";

export const UPDATE_ABOUT_ME = gql`
  mutation updateaboutme($aboutMe: String) {
    updateaboutme(aboutMe: $aboutMe) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      techs {
        _id
        name
      }
      posts {
        _id
        title
        content
        video
        video_title
      }
    }
  }
`;

export const UPDATE_CONTACT_INFO = gql`
  mutation updatecontactinfo($contactInfo: String) {
    updatecontactinfo(contactInfo: $contactInfo) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      techs {
        _id
        name
      }
      posts {
        _id
        title
        content
        video
        video_title
      }
    }
  }
`;

export const UPDATE_TECH = gql`
  mutation updatetech($techs: [ID]!) {
    updatetech(techs: $techs) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      techs {
        _id
        name
      }
      posts {
        _id
        title
        content
        video
        video_title
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation updatepost(
    $title: String
    $content: String
    $file: Upload
    $video_title: String
  ) {
    updatepost(
      title: $title
      content: $content
      file: $file
      video_title: $video_title
    ) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      techs {
        _id
        name
      }
      posts {
        _id
        title
        content
        video
        video_title
      }
    }
  }
`;

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

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
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

export const UPDATE_PHOTO = gql`
  mutation uploadprofilepic($file: Upload!) {
    uploadprofilepic(file: $file) {
      _id
      username
      email
      aboutMe
      profilePic
      contactInfo
      techs {
        _id
        name
      }
      posts {
        _id
        title
        content
        video
        video_title
      }
    }
  }
`;
