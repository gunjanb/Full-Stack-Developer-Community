import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Row, Col, Spinner } from "react-bootstrap";
import "./UserDashboard.css";

import AddPhoto from "../../components/AddPhoto/AddPhoto";
import AddAboutMe from "../../components/AddAboutMe/AddAboutMe";
import AddContactInfo from "../../components/AddContactInfo/AddContactInfo";
import AddPost from "../../components/AddPost/AddPost";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state;
  const { loading, data } = useQuery(QUERY_USERS);

  useEffect(() => {});

  return (
    <>
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "2rem",
            height: "2rem",
            margin: "auto",
            display: "block",
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </>
  );
};

export default UserDashboard;
