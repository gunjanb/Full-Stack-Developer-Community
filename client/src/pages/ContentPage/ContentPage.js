import React from 'react';
import ReactPlayer from 'react-player';
import { useQuery } from "@apollo/client";
import { useParams, Link } from 'react-router-dom';
import { QUERY_POST } from '../../utils/queries';
import { Row, Spinner, Card } from "react-bootstrap";
import './ContentPage.css';

const ContentPage = () => {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId },
  });

  const post = data?.post || {};

  if (loading) {
    return (
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
      </Spinner>
    );
  }
  return (
    <div className="vh-100">
      <h2 className="w-100 my-5 text-center">
        {post.title}Post Title
      </h2>
      <Row className="m-4  d-flex justify-content-center">
      <div className="p-4 d-flex flex-column align-items-center rounded resource-block">
          <Card className="w-75 mx-auto card-bg-color">
            {post.content ? (
              <>
                <Card.Body className="text-center">
                  <Card.Title>Content</Card.Title>
                  <p> {post.content}</p>
                </Card.Body>
              </>
            ) : (
              <Card.Body className="text-center text-white">
                <Card.Title>Content</Card.Title>
                <p className="text-center">
                  Lorem ipsum dolor sit amet at. Tincidunt lacinia quisque suspendisse erat tempor egestas nostra. Nullam nec odio pellentesque blandit. Sit maximus bibendum aliquet. Primis pellentesque quam ipsum.

                  Mollis per dictum efficitur vehicula. Hendrerit sed nec finibus ultricies donec ornare. Malesuada sed felis magna vel faucibus dolor. Fusce integer mattis consectetur rhoncus. Augue vehicula auctor pellentesque in per efficitur. Quam libero hendrerit facilisis.

                  Ornare sem per morbi praesent ac senectus. Letius sollicitudin donec mattis vitae netus. Consequat efficitur himenaeos mattis eu vitae vivamus. Curabitur tristique tempus curae aptent dis. Platea ut tellus nam efficitur.
                </p>
              </Card.Body>
            )}
          </Card>
        </div>
      </Row>
      <Row className="m-4  d-flex justify-content-center">
        <h2 className="w-100 my-5 text-center">{post.video_title} Video Title</h2>
        <div className="p-4 d-flex flex-column align-items-center rounded resource-block">
          <Card className="w-75 mx-auto card-bg-color">
            {post.video ? (
              <ReactPlayer
                width="100%"
                height="100%"
                playsinline={true}
                controls={true}
                playIcon={<button>Play</button>}
                url="https://www.youtube.com/watch?v=LRP8d7hhpoQ"
              />
            ) : (
              <ReactPlayer
                width="100%"
                height="100%"
                playsinline={true}
                controls={true}
                playIcon={<button>Play</button>}
                url="https://www.youtube.com/watch?v=LRP8d7hhpoQ"
              />
            )}
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ContentPage;
