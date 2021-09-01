import React from "react";
import firstSlide from "./../../assets/learningtogether.jpg";
import secondSlide from "../../assets/learningtogether.jpeg";
import thirdSlide from "../../assets/working-together.jpeg";
import "./Home.css";
import TechNames from "../../components/TechNames/TechNames";
import UserDisplay from "../../components/UserDisplay/UserDisplay";
import { Container } from "react-bootstrap";
// import "./debug.css";

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

      <div className="container learn-more padding-bottom pt-2">
        <Container className="container">
          <h5 className="learn-more learn-background rounded">Learn More About...</h5>
          <TechNames />
        </Container>
        <Container className="">
          <UserDisplay />
        </Container>
      </div>
    </div>
  );
};

export default Home;
