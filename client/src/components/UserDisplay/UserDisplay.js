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
    return usersFiltered;
  }

  return (
    <Col lg={12}>
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "5rem",
            height: "5rem",
            margin: "auto",
            display: "block",
          }}
        ></Spinner>
      ) : (
        <div className="container d-flex justify-content-evenly flex-wrap">
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
