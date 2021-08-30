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
      <Button
        type="button"
        className="btn btn-block btn-squared btn-light text-dark resource-button m-2"
        onClick={handleShow}
      >
        <span>{props.post.title}</span>
      </Button>

      {console.log(props.post.video)}
      {console.log(props.post.content)}
      {show && (
        <div style={{ backgroundColor: "black" }}>
          <div
            className="d-flex  
            m-2 stylethemodal flex-column "
          >
            <div>
              <ReactPlayer
                width="100%"
                height="100%"
                playsinline={true}
                controls={true}
                playIcon={<button>Play</button>}
                url={props.post.video}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </div>
            <div className="p-1 bg-white w-100 text-dark d-flex justify-content-center flex-column align-items-center">
              <h6 className="text-dark"> Short Description</h6>
              {props.post.content}
            </div>
            <Button type="button" className="m-2" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPostModal;
