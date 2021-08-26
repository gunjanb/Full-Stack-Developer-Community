import React from "react";
// import Jumbotron from "../../components/Jumbotron";

// const UserProfile = () => {
//   return (
//     <div className="container">
//       <Jumbotron>
//         <h1>User Profile</h1>
//         <p>Content Here</p>
//       </Jumbotron>
//     </div>
//   );
// };

// export default UserProfile;
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Row, Col, Spinner, Card } from "react-bootstrap";
import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state;
  const { profileId } = useParams();
  const { loading, data } = useQuery(QUERY_USERS);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (users.length) {
      console.log(data);
      setCurrentUser(data.users.find((user) => user._id === profileId));
    } else if (data) {
      dispatch({
        type: UPDATE_USERS,
        payload: data.users,
      });
      data.users.forEach((user) => {
        idbPromise("users", "put", user);
      });
    } else if (!loading) {
      idbPromise("users", "get").then((users) => {
        dispatch({ type: UPDATE_USERS, payload: users });
      });
    }
  }, [data, profileId, dispatch]);
};

export default UserProfile;
