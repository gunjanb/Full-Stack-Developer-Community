import React from "react";
import firstSlide from "../../assets/learningtogether.jpg";
import secondSlide from "../../assets/learningtogether.jpeg";
import thirdSlide from "../../assets/working-together.jpeg";
import "../Home/Home.css"

// Need to fix buttons with data
const Home = () => {
  return (
  <div className="container d-flex flex-wrap justify-content-evenly align-items-center mt-5 mb-5 text-style">
    <div className="card card-border col-md-6">
      <h1 className="header-title">Full Stack Development Community</h1>
      <p className="p-text mt-3">Let's Learn Together! Learn about your favorite technologies, or become a part of the learning experience and create videos to help new web developes on their path to success.  Whether you are new to web development or have been doing this for years, we are all in this together! <br /> <br /> Sign up, or login to view videos by technology, or contribute to the Full Stack Development Community!</p>
    </div>
      <div className="carousel-container pic-carousel-container card-border" id="myCarousal" class="carousel slide" data-bs-ride="carousel" data-interval="2000">
            <div className="carousel-inner image-size">
              <div className="carousel-item active">
                <img src={firstSlide} className="d-block w-100 image-size img-fluid rounded" alt="Full Stack Development Community" title="Full Stack Development Community"/>
              </div>
              <div class="carousel-item">
                <img src={secondSlide} className="d-block w-100 image-size img-fluid rounded" alt="Let's Learn Together" title="Let's Learn Together"/>
              </div>
              <div class="carousel-item">
                <img src={thirdSlide} className="d-block w-100 image-size img-fluid rounded" alt="Let's Learn Together" title="Let's Learn Together"/>
              </div>
            </div>
        </div>
        
        <div className="container d-flex justify-content-evenly align-items-center flex-wrap mt-5 mb-2 tech-button">
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">Javascript</button>
        </div>
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">HTML</button>
        </div>
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">CSS</button>
        </div>
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">React</button>
        </div>
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">Redux</button>
        </div>
        <div className="card card-border m-4">
          <h3>Learn more about</h3>
        <button type="button" class="btn btn-lg button-style">GraphQL</button>
        </div>
        
        </div>
    </div>
      
        

  );
};

export default Home;

