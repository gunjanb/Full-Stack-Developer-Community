// import React from "react";
// // import Jumbotron from "../../components/Jumbotron";

// // const UserProfile = () => {
// //   return (
// //     <div className="container">
// //       <Jumbotron>
// //         <h1>User Profile</h1>
// //         <p>Content Here</p>
// //       </Jumbotron>
// //     </div>
// //   );
// // };

// // export default UserProfile;
// import { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, Link } from "react-router-dom";
// import { QUERY_USERS } from "../../utils/queries";
// import { UPDATE_USERS } from "../../utils/actions";
// import { idbPromise } from "../../utils/helper";
// import { Row, Col, Spinner, Card } from "react-bootstrap";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   const { users } = state;
//   const { profileId } = useParams();
//   const { loading, data } = useQuery(QUERY_USERS);
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     if (users.length) {
//       setCurrentUser(data.users.find((user) => user._id === profileId));
//     } else if (data) {
//       dispatch({
//         type: UPDATE_USERS,
//         payload: data.users,
//       });
//       data.users.forEach((user) => {
//         idbPromise("users", "put", user);
//       });
//       setCurrentUser(data.users.find((user) => user._id === profileId));
//     } else if (!loading) {
//       idbPromise("users", "get").then((users) => {
//         dispatch({ type: UPDATE_USERS, payload: users });
//       });
//     }
//   }, [data, profileId, dispatch]);

//   return (
//     <>
//       {/* if page is loading show spinner  */}
//       {loading ? (
//         <Spinner
//           animation="border"
//           role="status"
//           style={{
//             width: "2rem",
//             height: "2rem",
//             margin: "auto",
//             display: "block",
//           }}
//         ></Spinner>
//       ) : (
//         <>
//           {console.log(currentUser)}
//           {currentUser ? (
//             <div className="vh-100">
//               <h1 className="w-100 my-5 text-center">
//                 {currentUser.username}!
//               </h1>
//               <Row className="m-4  d-flex justify-content-center ">
//                 <Col lg={6} className="pb-2">
//                   <Card className="w-75 mx-auto card-bg-color">
//                     {currentUser.profilePic ? (
//                       <>
//                         <Card.Img
//                           variant="top"
//                           className="w-75 mx-auto rounded"
//                           // src={currentUser.profilePic}
//                           src={currentUser.profilePic}
//                         />
//                       </>
//                     ) : (
//                       <Card.Body className="text-center text-white">
//                         <Card.Title>Profile Pic</Card.Title>
//                         <p className="text-center">
//                           Not added any profile pic yet
//                         </p>
//                       </Card.Body>
//                     )}
//                   </Card>
//                 </Col>
//                 <Col lg={6}>
//                   <Card className="w-75 mx-auto card-bg-color">
//                     {currentUser.aboutMe ? (
//                       <>
//                         <Card.Body className="text-center">
//                           <Card.Title>About Me</Card.Title>
//                           <Card.Text>{currentUser.AboutMe}</Card.Text>
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center text-white">
//                         <Card.Title>About Me</Card.Title>
//                         <p className="text-center">Not added any bio yet</p>
//                       </Card.Body>
//                     )}
//                   </Card>
//                 </Col>
//               </Row>
//               <Row className="m-4  d-flex justify-content-center ">
//                 <Col lg={6}>
//                   <Card className="w-75 mx-auto card-bg-color">
//                     {currentUser.contactInfo ? (
//                       <>
//                         <Card.Body className="text-center">
//                           <Card.Title>Contact Info</Card.Title>
//                           <p> {currentUser.contactInfo}</p>
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center text-white">
//                         <Card.Title>Contact Info</Card.Title>
//                         <p className="text-center">
//                           Not added any contact Info yet
//                         </p>
//                       </Card.Body>
//                     )}
//                   </Card>
//                 </Col>
//                 <Col lg={6}>
//                   <Card className="w-75 mx-auto card-bg-color">
//                     {currentUser.posts && currentUser.posts.length ? (
//                       <>
//                         <Card.Body className="text-center">
//                           {/* <h5 className="text-center dark-black-color">
//                             Techs
//                           </h5> */}
//                           <Card.Title>Techs</Card.Title>
//                           <ul className="d-flex flex-row flex-wrap justify-content-center mt-2 mb-3">
//                             {currentUser.posts.map((post) => (
//                               <span
//                                 key={post._id}
//                                 className="d-inline-block text-center btn-sm m-1 text-white"
//                               >
//                                 {post.tech.name}
//                               </span>
//                             ))}
//                           </ul>
//                           {/* need to pass the tech  already user selected in previous articles as prop to this component */}
//                           {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center ">
//                         {/* <h5 className="text-center dark-black-color">Techs</h5> */}
//                         <Card.Title>Techs</Card.Title>
//                         <p className="text-center">Not added anything yet</p>
//                         {/* will work fine if we go with model having user having tech and post seperate model and not nested one  and just part of user itself */}
//                         {/* {not having any previous techs selected so anything user selected will get added to user model } */}
//                         {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
//                       </Card.Body>
//                     )}
//                   </Card>
//                 </Col>
//               </Row>
//               <Row className="m-4  d-flex justify-content-center">
//                 <div className="  p-4 d-flex flex-column align-items-center rounded resource-block">
//                   {/* <h4 className="dark-black-color">Resources</h4> */}
//                   <Card.Title>Resoures</Card.Title>
//                   {currentUser.posts && currentUser.posts.length ? (
//                     <div className="w-20">
//                       {currentUser.posts.map((post) => (
//                         <Link
//                           className="btn btn-block btn-squared btn-light text-dark"
//                           to={`/post/${post._id}/`}
//                         >
//                           {post.title}
//                         </Link>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>Not Added any content yet</p>
//                   )}
//                 </div>
//               </Row>
//             </div>
//           ) : null}
//         </>
//       )}
//     </>
//   );
// };
// export default UserProfile;

import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Row, Col, Spinner, Card, Button } from "react-bootstrap";
import "./UserProfile.css";
import ViewPostModal from "../../components/ViewPostModal/ViewPostModal";
import Auth from "../../utils/auth";

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
          {console.log(currentUser)}
          {currentUser && Auth.loggedIn() ? (
            <div className="vh-100 bottom-spacing">
              <h1 className="w-100 my-5 text-center">
                {currentUser.username}!
              </h1>
              <Row className="m-4  d-flex justify-content-center ">
                <Col lg={6} className="pb-2">
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.profilePic ? (
                      <>
                        <Card.Img
                          variant="top"
                          className="w-75 mx-auto rounded"
                          // src={currentUser.profilePic}
                          src={currentUser.profilePic}
                        />
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <Card.Title>Profile Pic</Card.Title>
                        <p className="text-center">
                          Not added any profile pic yet
                        </p>
                      </Card.Body>
                    )}
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.aboutMe ? (
                      <>
                        <Card.Body className="text-center">
                          <Card.Title>About Me</Card.Title>
                          <Card.Text>{currentUser.AboutMe}</Card.Text>
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <Card.Title>About Me</Card.Title>
                        <p className="text-center">Not added any bio yet</p>
                      </Card.Body>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row className="m-4  d-flex justify-content-center ">
                <Col lg={6}>
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.contactInfo ? (
                      <>
                        <Card.Body className="text-center">
                          <Card.Title>Contact Info</Card.Title>
                          <p> {currentUser.contactInfo}</p>
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <Card.Title>Contact Info</Card.Title>
                        <p className="text-center">
                          Not added any contact Info yet
                        </p>
                      </Card.Body>
                    )}
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="w-75 mx-auto card-bg-color">
                    {currentUser.posts && currentUser.posts.length ? (
                      <>
                        <Card.Body className="text-center">
                          {/* <h5 className="text-center dark-black-color">
                            Techs
                          </h5> */}
                          <Card.Title>Techs</Card.Title>
                          <ul className="d-flex flex-row flex-wrap justify-content-center mt-2 mb-3">
                            {currentUser.techs.map((tech) => (
                              <span
                                key={tech._id}
                                className="d-inline-block text-center btn-sm m-1 text-white"
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
                        <Card.Title>Techs</Card.Title>
                        <p className="text-center">Not added anything yet</p>
                        {/* will work fine if we go with model having user having tech and post seperate model and not nested one  and just part of user itself */}
                        {/* {not having any previous techs selected so anything user selected will get added to user model } */}
                        {/* <SelectTech currentUserTechs={currentUser.techs} /> */}
                      </Card.Body>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row className="m-4 d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center rounded resource-block">
                  {/* <h4 className="dark-black-color">Resources</h4> */}
                  <Card.Title>Resoures</Card.Title>
                  {currentUser.posts && currentUser.posts.length ? (
                    <div className="p-5 ">
                      {currentUser.posts.map((post) => (
                        // <ViewPost key={post._id} videoUrl={post.video} />
                        <div className="d-flex flex-column p-2">
                          <ViewPostModal post={post} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Not Added any content yet</p>
                  )}
                </div>
              </Row>
            </div>
          ) : (
            <p className="d-flex justify-content-center login-msg">
              Please{" "}
              <Link to="/login" className="px-2">
                login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="px-2">
                signup{" "}
              </Link>
              for free to learn more.
            </p>
          )}
        </>
      )}
    </>
  );
};
export default UserProfile;
