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

  // set show to true and false
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

  //on submit

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    console.log(file);
    console.log(title, content, videotitle);

    try {
      // await addPost({
      //   variables: {
      //     file: file,
      //     title: title,
      //     tech: tech,
      //     content: content,
      //     video_tilte: videotitle,
      //   },
      // });
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
  // title: String!
  // tech: String!
  // content: String!
  // video: String
  // video_title: String

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
      <Button className="w-50 btn-sm" variant="dark" onClick={handleShow}>
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
          <Modal.Title>Add your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex  flex-column justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 m-1 p-1">
              {/* <p className="">Select title:</p> */}
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
              {/* <p>Short Description:</p> */}
              <label htmlFor="content">Short Description:</label>
              <textarea
                name="content"
                placeholder="write your view here"
                value={content}
                className="form-control w-100"
                style={{ lineHeight: "1.5" }}
                rows="5"
                onChange={handlecontent}
              ></textarea>
            </div>

            {/* <div className="col-12 m-1 p-1">
              <label htmlFor="tech">Select a tech:</label>
              <select onChange={(e) => setTech(e.target.value)} value={tech}>
                <option>Choose an option</option>
                {data?.techs.map((tech) => (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="col-12 m-1 p-1">
              {/* <p className="">Select Video title:</p> */}
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
              {/* <p className="pt-1">Select Video to upload:</p> */}
              {/* <label htmlFor="file">Select Video:</label> */}
              {/* <input
                type="file"
                name="file"
                value={file}
                accept="video/*"
                className="form-input w-100"
                onChange={handlefile}
              /> */}

              {/* <Form.File
                className="text-center"
                type="file"
                // className="custom-file-label"
                // id="inputGroupFile01"
                // label={file}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}

              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="col-12 m-1 p-1 ">
              <button className="btn btn-dark btn-sm p-1" type="submit">
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
