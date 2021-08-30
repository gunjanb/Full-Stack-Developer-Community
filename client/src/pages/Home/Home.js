// import React from "react";
// import firstSlide from "./../../assets/learningtogether.jpg";
// import secondSlide from "../../assets/learningtogether.jpeg";
// import thirdSlide from "../../assets/working-together.jpeg";
// import { useQuery } from '@apollo/client';
// import "./Home.css";
// import { QUERY_TECHS, QUERY_USER_ID, QUERY_USERS} from '../../utils/queries';
// import { useLazyQuery } from '@apollo/client';
// // import "./debug.css";

// const Home = () => {
//     const { loading: loading1, data: data1 } = useQuery(QUERY_TECHS);
//     const { loading: loading2, data: data2} = useQuery(QUERY_USERS)
//     // const [getUser, { loading: loading2, data: data2 }] = useLazyQuery(QUERY_USER_ID);

//     if (loading1 || loading2) {
//       return <div>Loading...</div>;
//     }

//   return (
//   <div className="container d-flex flex-row flex-wrap justify-content-around text-style margin">
//     <div className="container col-md-7 m-3">
//       <h1 className="header-title">Full Stack Developer Community</h1>
//       <p className="p-text mt-2">Let's Learn Together! Learn about your favorite technologies, or become a part of the learning experience and create videos to help new web developes on their path to success.  Whether you are new to web development or have been doing this for years, we are all in this together! <br /> <br /> Sign up, or login to view videos by technology, or contribute to the Full Stack Developer Community by uploading a video or donating!</p>

//     </div>
//       <div className="carousel-container pic-carousel-container col-md-5 me-5" id="myCarousal" className="carousel slide" data-bs-ride="carousel" data-interval="2000">
//             <div className="carousel-inner image-size">
//               <div className="carousel-item active">
//                 <img src={firstSlide} className="d-block w-100 image-size img-fluid rounded" alt="Full Stack Development Community" title="Full Stack Development Community"/>
//               </div>
//               <div className="carousel-item">
//                 <img src={secondSlide} className="d-block w-100 image-size img-fluid rounded" alt="Let's Learn Together" title="Let's Learn Together"/>
//               </div>
//               <div className="carousel-item">
//                 <img src={thirdSlide} className="d-block w-100 image-size img-fluid rounded" alt="Let's Learn Together" title="Let's Learn Together"/>
//               </div>
//             </div>
//         </div>

//       <div className="card-container learn-more padding-bottom">
//         {data1.techs.map((tech)=>{
//           return (
//             <div className="card card-border " key={tech._id}>
//             <h3>Learn more about</h3>
//             <button type="button" className="btn btn-lg button-style tech-button" data-toggle="modal" data-target="#exampleModal" key={tech._id}>{tech.name}</button>

//             <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
//               <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel">Our Developers</h5>
//                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body">

//         {data2.users.map((user)=>{
//           return(
//                   <div className="card" style={{width: '18rem'}} key={user._id}>
//                     <img src={`${user.profilePic}`} alt="profilePic"/>
//                     <div className="card-body">
//                       <h5 className="card-title">Developer:{user.username}</h5>
//                       <h6 className="card-subtitle mb-2 text-muted">{user.aboutMe}</h6>
//                       <p className="card-text"></p>
//                       <a href={`/profile/${user._id}`} className="card-link">Profile Link</a>
//                       <h6 href="#" className="card-link">{user.contactInfo}</h6>
//                     </div>
//                   </div>
//           )
//           }
//         )
//         }

//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                     <button type="button" className="btn btn-primary">Save changes</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             </div>
//           )
//         })}
//       </div>

//       {/* <div className="card-container learn-more padding-bottom">
//         {user_data.map((user)=>{
//           return (
//             <div className="card card-border ">
//               <h3>Developer</h3>
//               <button type="button" className="btn btn-lg button-style tech-button" key={`${user._id}`}>{user.username}</button>
//             </div>
//           )
//         })}
//       </div> */}
//     </div>
//   );
// };

// export default Home;

import React from "react";
import firstSlide from "./../../assets/learningtogether.jpg";
import secondSlide from "../../assets/learningtogether.jpeg";
import thirdSlide from "../../assets/working-together.jpeg";
import { useQuery } from "@apollo/client";
import "./Home.css";
import { QUERY_TECHS, QUERY_USERS } from "../../utils/queries";
import TechNames from "../../components/TechNames/TechNames";
import UserDisplay from "../../components/UserDisplay/UserDisplay";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div className="container d-flex flex-row flex-wrap justify-content-around text-style margin">
      <div className="container col-md-7 m-3">
        <h1 className="header-title">Full Stack Developer Community</h1>
        <p className="p-text mt-2">
          Let's Learn Together! Learn about your favorite technologies, or
          become a part of the learning experience and create videos to help new
          web developes on their path to success. Whether you are new to web
          development or have been doing this for years, we are all in this
          together! <br /> <br /> Sign up, or login to view videos by
          technology, or contribute to the Full Stack Developer Community by
          uploading a video or donating!
        </p>
      </div>
      <div
        className="carousel-container pic-carousel-container col-md-5 me-5"
        id="myCarousal"
        className="carousel slide"
        data-bs-ride="carousel"
        data-interval="2000"
      >
        <div className="carousel-inner image-size">
          <div className="carousel-item active">
            <img
              src={firstSlide}
              className="d-block w-100 image-size img-fluid rounded"
              alt="Full Stack Development Community"
              title="Full Stack Development Community"
            />
          </div>
          <div className="carousel-item">
            <img
              src={secondSlide}
              className="d-block w-100 image-size img-fluid rounded"
              alt="Let's Learn Together"
              title="Let's Learn Together"
            />
          </div>
          <div className="carousel-item">
            <img
              src={thirdSlide}
              className="d-block w-100 image-size img-fluid rounded"
              alt="Let's Learn Together"
              title="Let's Learn Together"
            />
          </div>
        </div>
      </div>

      <div className="card-container learn-more padding-bottom">
        <Row className="w-100">
          <TechNames />
        </Row>
        <Row className="w-100">
          <UserDisplay />
        </Row>
      </div>
    </div>
  );
};

export default Home;
