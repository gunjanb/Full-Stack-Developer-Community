import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player";

const ViewPostModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowButton = () => setShow(true);

  return (
    <>
      <Button type="button" onClick={handleShowButton}>
        Click this
      </Button>

      {console.log(props.post.video)}
      {show && (
        <>
          <div
            className="d-flex  stylethemodal flex-column"
            style={{ marginBottom: "10rem" }}
          >
            <div>
              <ReactPlayer
                width="100%"
                height="100%"
                playsinline={true}
                controls={true}
                playIcon={<button>Play</button>}
                url={props.post.video}
                // url="https://www.youtube.com/watch?v=Cny_2QWxoe0"
              />
            </div>
            <div>{"hello"}</div>
            <Button type="button" onClick={handleClose}>
              Close this
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ViewPostModal;
