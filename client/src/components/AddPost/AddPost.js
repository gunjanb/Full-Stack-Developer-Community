import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_TECHS } from "../../utils/queries";
import { UPDATE_TECHS } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { idbPromise } from "../../utils/helper";
import "./AddPost.css";

const AddPost = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { techs } = state;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [tech, setTech] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState();
  const [videotitle, setVideoTitle] = useState();
  const [alltechs, setAllTechs] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data } = useQuery(QUERY_TECHS);
  const [updatepost, { loading }] = useMutation(ADD_POST);

  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_TECHS, payload: data.techs });
      data.techs.forEach((tech) => {
        idbPromise("techs", "put", tech);
      });
    } else if (!loading) {
      idbPromise("techs", "get").then((techs) => {
        dispatch({ type: UPDATE_TECHS, payload: techs });
      });
    }
  }, [data, loading, dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    
    try {
      await updatepost({
        variables: {
          title: title,
          content: content,
          file: file,
          video_title: videotitle,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  const handletitle = (event) => {
    setTitle(event.target.value);
  };
  const handletech = (event) => {
    setTech(event.target.value);
  };

  const handlecontent = (event) => {
    setContent(event.target.value);
  };

  const handlefile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handlevideotitle = (event) => {
    setVideoTitle(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: " 1rem",
            height: " 1rem",
            margin: "auto",
            display: "block",
          }}
        ></Spinner>
      ) : null}
      <Button className="post-add" variant="light" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        className="Addpost"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="post-text">Add your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="m-2 d-flex flex-column justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 m-1 p-1">
              <label htmlFor="title">Title:</label>
              <input
                name="title"
                type="text"
                placeholder="title"
                value={title}
                className="form-input w-100"
                onChange={handletitle}
              />
            </div>
            <div className="col-12 m-1 p-1">
              <label htmlFor="content">Short Description:</label>
              <textarea
                name="content"
                placeholder="write your view here"
                value={content}
                className="form-control w-100 post-upload-text"
                style={{ lineHeight: "1.5" }}
                rows="5"
                onChange={handlecontent}
              ></textarea>
            </div>

            <div className="col-12 m-1 p-1">
              <label htmlFor="videotitle">Video Title:</label>
              <input
                name="videotitle"
                type="text"
                placeholder="video title"
                value={videotitle}
                className="form-input w-100"
                onChange={handlevideotitle}
              />
            </div>
            <div className="col-12 m-1 p-1">
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="col-12 m-1 p-1 ">
              <button className="post-button p-0" type="submit">
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPost;
