//all imports
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Row, Col, Spinner, Card } from "react-bootstrap";
import "./UserDashboard.css";
import AddPhoto from "../../components/AddPhoto/AddPhoto";
import AddAboutMe from "../../components/AddAboutMe/AddAboutMe";
import AddContactInfo from "../../components/AddContactInfo/AddContactInfo";
import AddPost from "../../components/AddPost/AddPost";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state;
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_USERS);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (data) {
      console.log(data);
      setCurrentUser(data.users.find((user) => user._id === userId));
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
  }, [data, userId, dispatch]);

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
          {console.log(currentUser)}
          {currentUser ? (
            <div className="vh-100">
              <h1 className="w-100 my-5 text-center">
                Welcome {currentUser.username}!
              </h1>
              <Row className="m-4  d-flex justify-content-center ">
                <Col lg={6} className="pb-2">
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.profilePic ? (
                      <>
                        <Card.Img
                          variant="top"
                          className="w-75 mx-auto rounded"
                          src={currentUser.profilePic}
                        />
                        <Card.Body className="text-center">
                          <AddPhoto />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <p className="text-center">Add your profile picture</p>
                        <AddPhoto />
                      </Card.Body>
                    )}
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.contactInfo ? (
                      <>
                        <Card.Body className="text-center">
                          <p> {currentUser.contactInfo}</p>
                          <AddContactInfo
                            currentUserContactInfo={currentUser.contactInfo}
                          />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <p className="text-center">Add your Contact Info</p>
                        <AddContactInfo
                          currentUserContactInfo={currentUser.contactInfo}
                        />
                      </Card.Body>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row className="m-4  d-flex justify-content-center">
                <Col lg={6} className="pb-2">
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.aboutMe ? (
                      <>
                        <Card.Body className="text-center">
                          <p> {currentUser.aboutMe} </p>
                          <AddAboutMe
                            currentUserAboutMe={currentUser.aboutMe}
                          />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <p className="text-center">Add About yourself</p>
                        <AddAboutMe currentUserAboutMe={currentUser.aboutMe} />
                      </Card.Body>
                    )}
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.posts && currentUser.posts.length ? (
                      <>
                        <Card.Body className="text-center">
                          <h5 className="text-center dark-black-color">
                            Techs
                          </h5>
                          <ul className="d-flex flex-row flex-wrap justify-content-center mt-2 mb-3">
                            {currentUser.posts.map((post) => (
                              <span
                                key={post._id}
                                className="d-inline-block text-center btn-sm m-1 text-white"
                              >
                                {post.tech.name}
                              </span>
                            ))}
                          </ul>
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center ">
                        <h5 className="text-center dark-black-color">Techs</h5>
                        <p className="text-center">Not added anything yet</p>
                        {/* will work fine if we go with model having user having tech and post seperate model and not nested one  */}
                        {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
                      </Card.Body>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row className="m-4  d-flex justify-content-center">
                <div className="  p-4 d-flex flex-column align-items-center rounded resource-block">
                  <h4 className="dark-black-color">Resources</h4>
                  {currentUser.posts && currentUser.posts.length ? (
                    <div className="w-20">
                      {currentUser.posts.map((post) => (
                        <Link
                          className="btn btn-block btn-squared btn-light text-dark"
                          to={`/post/${post._id}`}
                        >
                          {post.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>Add your content here you want to share</p>
                  )}
                  <AddPost />
                </div>
              </Row>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default UserDashboard;
