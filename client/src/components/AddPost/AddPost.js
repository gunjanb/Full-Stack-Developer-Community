import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_TECHS } from "../../utils/queries";
import "./AddPost.css";

const AddPost = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [tech, setTech] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState();
  const [videotitle, setVideoTitle] = useState();
  const [alltechs, setAllTechs] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, loading } = useQuery(QUERY_TECHS);
  useEffect(() => {
    if (data) {
      setAllTechs(data);
    }
  }, [data, loading]);
  const [addPost] = useMutation(ADD_POST);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    handleClose();

    try {
      await addPost({
        variables: {
          file: file,
          title: title,
          tech: tech,
          content: content,
          video_tilte: videotitle,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // MODAL TOGGLE
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

  const handleChange = (event) => {
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
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 m-1">
              <p className="">Select title:</p>
              <input
                name="title"
                type="text"
                placeholder="title"
                value={title}
                className="form-input w-100"
                onChange={handletitle}
              />
            </div>
            <div className="col-12">
              <p>Short Description:</p>
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

            <div className="col-12 m-1">
              <p>Select a tech </p>
              <select onChange={(e) => setTech(e.target.value)} value={tech}>
                <option>Choose an option</option>
                {alltechs.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 m-1">
              <p className="">Select Video title:</p>
              <input
                name="videotitle"
                type="text"
                placeholder="video title"
                value={videotitle}
                className="form-input w-100"
                onChange={handlevideotitle}
              />
            </div>
            <div className="col-12 m-1">
              <p className="pt-1">Select Video to upload:</p>
              <input
                type="file"
                name="file"
                value={file}
                className="form-input w-100"
                onChange={handlefile}
              />
            </div>

            <div className="col-12 ">
              <button className="btn btn-dark btn-sm py-1" type="submit">
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
