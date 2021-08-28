import React from 'react';
import { useQuery } from "@apollo/client";
import { useParams, Link } from 'react-router-dom';
import { QUERY_POST } from '../../utils/queries';
import { Row, Col, Spinner, Card } from "react-bootstrap";
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
      <h1 className="w-100 my-5 text-center">
        {post.title}!
      </h1>
      <Row className="m-4  d-flex justify-content-center ">
        <Col lg={6}>
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
                  No content has been added
                </p>
              </Card.Body>
            )}
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="w-75 mx-auto card-bg-color">
            {post.video_title ? (
              <>
                <Card.Body className="text-center">
                  <Card.Title>Video Title</Card.Title>
                  <Card.Text>{post.video_title}</Card.Text>
                </Card.Body>
              </>
            ) : (
              <Card.Body className="text-center text-white">
                <Card.Title>Video Title</Card.Title>
                <p className="text-center">Video has not been added</p>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="m-4  d-flex justify-content-center">
        <div className="  p-4 d-flex flex-column align-items-center rounded resource-block">
          <Card className="w-75 mx-auto card-bg-color">
            {post.video ? (
              <>
                <Card.Body className="text-center">
                  <Card.Title>Video</Card.Title>
                  <Card.Text>{post.video}</Card.Text>
                </Card.Body>
              </>
            ) : (
              <Card.Body className="text-center text-white">
                <Card.Title>Video</Card.Title>
                <p className="text-center">Video has not been added</p>
              </Card.Body>
            )}
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ContentPage;
