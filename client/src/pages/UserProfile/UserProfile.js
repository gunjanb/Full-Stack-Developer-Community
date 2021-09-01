import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Container, Row, Spinner, Card } from "react-bootstrap";
import ViewPostModal from "../../components/ViewPostModal/ViewPostModal";
import Auth from "../../utils/auth";
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
      setCurrentUser(data.users.find((user) => user._id === profileId));
    } else if (data) {
      dispatch({
        type: UPDATE_USERS,
        payload: data.users,
      });
      data.users.forEach((user) => {
        idbPromise("users", "put", user);
      });
      setCurrentUser(data.users.find((user) => user._id === profileId));
    } else if (!loading) {
      idbPromise("users", "get").then((users) => {
        dispatch({ type: UPDATE_USERS, payload: users });
      });
    }
  }, [data, profileId, dispatch]);

  return (
    <>
      {/* if page is loading show spinner  */}
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
        ></Spinner>
      ) : (
        <>
          {currentUser && Auth.loggedIn() ? (
            <div className="container container-user mypadding text-style">
              <h1 className="text-center user-title">
                {currentUser.username}!
              </h1>
              <Container fluid>
                
                <Row className="d-flex justify-content-evenly flex-wrap flex-shrink-2 m-3">
                  <Card className="card-bg-color user-card-image align-items-center col-sm-5 flex-shrink-0">
                    {currentUser.profilePic ? (
                      <>
                        <Card.Img
                          variant="top"
                          className="user-img rounded img-fluid"
                          // src={currentUser.profilePic}
                          src={currentUser.profilePic}
                        />
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <Card.Title className="text-center user-header">Profile Pic</Card.Title>
                        <p className="text-center user-header">
                          Not added any profile pic yet
                        </p>
                      </Card.Body>
                    )}
                  </Card>
          
         
                  <Card className="card-bg-color user-header col-md-6 mb-1 flex-shrink-2 flex-grow-2">
                    {currentUser.aboutMe ? (
                      <>
                        <Card.Body className=" about-size text-center profile-text about-size align-self-center">
                          <Card.Title className="text-center user-header pt-3">About Me</Card.Title>
                          <Card.Text>{currentUser.aboutMe}</Card.Text>
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center user-header align-self-center flex-grow-2">
                        <Card.Title className="text-center user-header pt-3">About Me</Card.Title>
                        <p className="text-center p-2">Not added any bio yet</p>
                      </Card.Body>
                    )}
                  </Card>
                  </Row>
        
             
                <Row className="d-flex justify-content-evenly flex-wrap flex-shrink-2 flex-grow-2 m-3">
                  <Card className="card-bg-color col-sm-5 contact-card">
                    {currentUser.contactInfo ? (
                      <>
                        <Card.Body className="text-center profile-text align-self-center">
                          <Card.Title className="text-center user-header">Contact Info</Card.Title>
                          <p> {currentUser.contactInfo}</p>
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white align-self-center">
                        <Card.Title>Contact Info</Card.Title>
                        <p className="text-center">
                          Not added any contact Info yet
                        </p>
                      </Card.Body>
                    )}
                  </Card>


                  <Card className="card-bg-color col-sm-6 flex-shrink-2">
                    {currentUser.posts && currentUser.posts.length ? (
                      <>
                        <Card.Body className="text-center">
                          {/* <h5 className="text-center dark-black-color">
                            Techs
                          </h5> */}
                          <Card.Title className="text-center user-header">Techs</Card.Title>
                          <ul className="d-inline-flex flex-row flex-wrap justify-content-evenly mt-3 mb-3">
                            {currentUser.techs.map((tech) => (
                              <span
                                key={tech._id}
                                className="text-center tech-list"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </ul>
                          {/* need to pass the tech  already user selected in previous articles as prop to this component */}
                          {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center ">
                        {/* <h5 className="text-center dark-black-color">Techs</h5> */}
                        <Card.Title className="text-center user-header">Techs</Card.Title>
                        <p className="text-center user-tech">Nothing Added Yet!</p>
                        {/* will work fine if we go with model having user having tech and post seperate model and not nested one  and just part of user itself */}
                        {/* {not having any previous techs selected so anything user selected will get added to user model } */}
                        {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
                      </Card.Body>
                    )}
                  </Card>
                </Row>
          
              <Row className="d-flex justify-content-evenly flex-wrap flex-shrink-0 flex-grow-0 m-3">
                <Card className="card-bg-color col-sm-10 align-self-center resource-width mb-4">
                  <Card.Title className="user-header mt-4">Resoures</Card.Title>
                  {currentUser.posts && currentUser.posts.length ? (
                    <div className="p-1 user-header">
                      {currentUser.posts.map((post) => (
                        <div className="p1" key={post._id}>
                          <div className="d-flex flex-column p-2">
                          <ViewPostModal post={post} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="user-tech" >Not Added any content yet</p>
                  )}
                  </Card>
                </Row>
              </Container>
            </div>
          ) : (
          <Container fluid>
            <Card className="user-header d-flex justify-content-center align-self-center login-msg text-style">
              Please{" "}
              <Link to="/login" className="px-2">
                login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="px-2">
                signup{" "}
              </Link> 
              for free to learn more.
            </Card>
            </Container>
          )}
        </>
      )}
    </>
  );
};
export default UserProfile;
