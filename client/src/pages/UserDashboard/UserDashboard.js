// import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, Link } from "react-router-dom";
// import { QUERY_USERS } from "../../utils/queries";
// import { UPDATE_USERS } from "../../utils/actions";
// import { idbPromise } from "../../utils/helper";
// import { Container, Row , Col, Spinner, Card } from "react-bootstrap";
// import "./UserDashboard.css";
// import AddPhoto from "../../components/AddPhoto/AddPhoto";
// import AddAboutMe from "../../components/AddAboutMe/AddAboutMe";
// import AddContactInfo from "../../components/AddContactInfo/AddContactInfo";
// import AddPost from "../../components/AddPost/AddPost";
// import AddTech from "../../components/AddTech/AddTech";

// const UserDashboard = () => {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   const { users } = state;
//   const { userId } = useParams();
//   const { loading, data } = useQuery(QUERY_USERS);
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     if (data) {
//       setCurrentUser(data.users.find((user) => user._id === userId));
//       dispatch({
//         type: UPDATE_USERS,
//         payload: data.users,
//       });
//       data.users.forEach((user) => {
//         idbPromise("users", "put", user);
//       });
//     } else if (!loading) {
//         idbPromise("users", "get").then((users) => {
//         dispatch({ type: UPDATE_USERS, payload: users });
//       });
//     }
//   }, [data, userId, dispatch]);

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
//           {currentUser ? (
//             <div className="container-user mypadding text-style">
//               <h1 className="text-center user-title">
//                 Welcome {currentUser.username}!
//               </h1>
//               <Container fluid>
//                 <div className="d-flex justify-content-evenly flex-wrap flex-shrink-0">
//                   <Card className="card-bg-color align-items-center col-sm-5 pt-5">
//                     {currentUser.profilePic ? (
//                       <>
//                         <Card.Img
//                           variant="top"
//                           className="user-img rounded img-fluid"
//                           src={currentUser.profilePic}
//                         />
//                         <Card.Body className="text-center">
//                           <AddPhoto />
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center text-white">
//                         <p className="text-center user-header">Add your profile picture</p>
//                         <AddPhoto />
//                       </Card.Body>
//                     )}
//                   </Card>

//                   <Card className="align-items-center card-bg-color user-header col-sm-6">
//                     {currentUser.aboutMe ? (
//                       <>
//                         <Card.Body className="text-center profile-text about-size">
//                           <p className="p-2"> {currentUser.aboutMe} </p>
//                           <AddAboutMe
//                             currentUserAboutMe={currentUser.aboutMe}
//                           />
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center user-header text-white">
//                         <p className="text-center p-2">Add About yourself</p>
//                         <AddAboutMe currentUserAboutMe={currentUser.aboutMe} />
//                       </Card.Body>
//                     )}
//                   </Card>

//                   <Card className="card-bg-color col-sm-5">
//                     {currentUser.techs && currentUser.techs.length ? (
//                       <>
//                         <Card.Body className="text-center">
//                           <h5 className="text-center user-header">
//                             Techs
//                           </h5>
//                           <ul className="d-flex flex-row flex-wrap justify-content-evenly mt-2 mb-3">
//                             {currentUser.techs.map((tech) => (
//                               <span
//                                 key={tech._id}
//                                 className="text-center tech-list"
//                               >
//                                 {tech.name}
//                               </span>
//                             ))}
//                           </ul>

//                           <AddTech
//                             currentUserAvailabletechs={currentUser.techs}
//                           />
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center ">
//                         <h5 className="text-center user-header">Techs</h5>
//                         <p className="text-center user-tech">Nothing Added Yet!</p>

//                         <AddTech
//                           currentUserAvailabletechs={currentUser.techs}
//                         />
//                       </Card.Body>
//                     )}
//                   </Card>
//                   <Card className="card-bg-color col-sm-6">
//                     {currentUser.contactInfo ? (
//                       <>
//                         <Card.Body className="text-center profile-text">
//                           <p> {currentUser.contactInfo}</p>
//                           <AddContactInfo
//                             currentUserContactInfo={currentUser.contactInfo}
//                           />
//                         </Card.Body>
//                       </>
//                     ) : (
//                       <Card.Body className="text-center text-white user-header">
//                         <p className="text-center">Add your Contact Info</p>
//                         <AddContactInfo
//                           currentUserContactInfo={currentUser.contactInfo}
//                         />
//                       </Card.Body>
//                     )}
//                   </Card>

//                   <Card className="card-bg-color col-sm-11 align-items-center p-3 ms-3 me-3 mb-3">
//                     <h4 className="user-header">Resources</h4>
//                     {currentUser.posts && currentUser.posts.length ? (
//                       <div className="p-1">
//                         {currentUser.posts.map((post) => (
//                           <div className="p-1" key={post._id}>
//                             <Link
//                               className="btn btn-block btn-squared btn-light text-dark resource-button"
//                               to={`/post/${post._id}`}
//                             >
//                               {post.title}
//                             </Link>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="user-tech">Add your content here you want to share</p>
//                     )}
//                     <AddPost />

//                   </Card>
//                 </div>
//               </Container>
//             </div>
//           ) : null}
//         </>
//       )}
//     </>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import "./UserDashboard.css";
import AddPhoto from "../../components/AddPhoto/AddPhoto";
import AddAboutMe from "../../components/AddAboutMe/AddAboutMe";
import AddContactInfo from "../../components/AddContactInfo/AddContactInfo";
import AddPost from "../../components/AddPost/AddPost";
import AddTech from "../../components/AddTech/AddTech";
import ViewPostModal from "../../components/ViewPostModal/ViewPostModal";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state;
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_USERS);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (data) {
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
          {currentUser ? (
            <div className="container-user mypadding text-style">
              <h1 className="text-center user-title">
                Welcome {currentUser.username}!
              </h1>
              <Container fluid>
                <div className="d-flex justify-content-evenly flex-wrap flex-shrink-0">
                  <Card className="card-bg-color align-items-center col-sm-5 pt-5">
                    {currentUser.profilePic ? (
                      <>
                        <Card.Img
                          variant="top"
                          className="user-img rounded img-fluid"
                          src={currentUser.profilePic}
                        />
                        <Card.Body className="text-center">
                          <AddPhoto />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white">
                        <p className="text-center user-header">
                          Add your profile picture
                        </p>
                        <AddPhoto />
                      </Card.Body>
                    )}
                  </Card>

                  <Card className="align-items-center card-bg-color user-header col-sm-6">
                    {currentUser.aboutMe ? (
                      <>
                        <Card.Body className="text-center profile-text about-size">
                          <p className="p-2"> {currentUser.aboutMe} </p>
                          <AddAboutMe
                            currentUserAboutMe={currentUser.aboutMe}
                          />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center user-header text-white">
                        <p className="text-center p-2">Add About yourself</p>
                        <AddAboutMe currentUserAboutMe={currentUser.aboutMe} />
                      </Card.Body>
                    )}
                  </Card>

                  <Card className="card-bg-color col-sm-5">
                    {currentUser.techs && currentUser.techs.length ? (
                      <>
                        <Card.Body className="text-center">
                          <h5 className="text-center user-header">Techs</h5>
                          <ul className="d-flex flex-row flex-wrap justify-content-evenly mt-2 mb-3">
                            {currentUser.techs.map((tech) => (
                              <span
                                key={tech._id}
                                className="text-center tech-list"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </ul>

                          <AddTech
                            currentUserAvailabletechs={currentUser.techs}
                          />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center ">
                        <h5 className="text-center user-header">Techs</h5>
                        <p className="text-center user-tech">
                          Nothing Added Yet!
                        </p>

                        <AddTech
                          currentUserAvailabletechs={currentUser.techs}
                        />
                      </Card.Body>
                    )}
                  </Card>
                  <Card className="card-bg-color col-sm-6">
                    {currentUser.contactInfo ? (
                      <>
                        <Card.Body className="text-center profile-text">
                          <p> {currentUser.contactInfo}</p>
                          <AddContactInfo
                            currentUserContactInfo={currentUser.contactInfo}
                          />
                        </Card.Body>
                      </>
                    ) : (
                      <Card.Body className="text-center text-white user-header">
                        <p className="text-center">Add your Contact Info</p>
                        <AddContactInfo
                          currentUserContactInfo={currentUser.contactInfo}
                        />
                      </Card.Body>
                    )}
                  </Card>

                  <Card className="card-bg-color col-sm-11 align-items-center p-3 ms-3 me-3 mb-3">
                    <h4 className="user-header">Resources</h4>
                    {currentUser.posts && currentUser.posts.length ? (
                      <div className="p-1">
                        {currentUser.posts.map((post) => (
                          <div className="p-1" key={post._id}>
                            <div className="d-flex flex-column p-2">
                              <ViewPostModal post={post} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="user-tech">
                        Add your content here you want to share
                      </p>
                    )}
                    <AddPost />
                  </Card>
                </div>
              </Container>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default UserDashboard;
