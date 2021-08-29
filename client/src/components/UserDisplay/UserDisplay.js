import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";

import UserCard from "../UserCard/UserCard";
import { Col, Spinner } from "react-bootstrap";

const UserDisplay = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  const { users, currentTech } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_USERS,
        payload: data.users,
      });
      data.users.forEach((user) => {
        idbPromise("users", "put", user);
      });
      console.log("from useEffect", data);
    } else if (!loading) {
      idbPromise("users", "get").then((users) => {
        dispatch({
          type: UPDATE_USERS,
          payload: users,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterUsers() {
    let actualUsers = [];
    for (const key in users) {
      actualUsers.push(users[key]);
    }
    const usersFiltered = actualUsers.filter((user) => {
      const techsFiltered = user.techs.filter(
        (tech) => tech._id === currentTech
      );
      if (techsFiltered.length) {
        return true;
      } else {
        return false;
      }
    });

    console.log("******", usersFiltered);
    return usersFiltered;
  }

  return (
    <Col lg={12}>
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div
          className="d-flex justify-content-center flex-wrap mx-auto"
          style={{ maxWidth: "80%" }}
        >
          {filterUsers() ? (
            filterUsers().map((user) => <UserCard {...user} key={user._id} />)
          ) : (
            <h3>No Users Posted </h3>
          )}
        </div>
      )}
    </Col>
  );
};

export default UserDisplay;
