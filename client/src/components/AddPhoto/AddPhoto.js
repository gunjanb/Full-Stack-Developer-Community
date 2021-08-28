import React, { useState } from "react";
import { Modal, Button, Form, Spinner, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_PHOTO } from "../../utils/mutations";
import "./AddPhoto.css";

const AddPhoto = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [updateprofilepic, { loading }] = useMutation(UPDATE_PHOTO);
  //set show to true or false
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //on submit
  const handleFileUpload = async (e) => {
    e.preventDefault();
    // var files = document.getElementById("uploadphoto").files;
    handleClose();
    // const file = files[0];
    console.log(file);
    try {
      await updateprofilepic({
        variables: {
          file: file,
        },
      });
    } catch (err) {
      console.error(err);
    }
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
        Add Profile pic
      </Button>

      <Modal
        className="Addphoto"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add your profile photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-2" onSubmit={handleFileUpload}>
            <Form.Group>
              {/* <Form.File className="text-center" id="uploadphoto" /> */}
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit" variant="dark btn-sm ">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPhoto;
