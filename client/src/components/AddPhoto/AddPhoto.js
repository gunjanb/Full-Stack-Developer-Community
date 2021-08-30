import React, { useState } from "react";
import { Modal, Button, Form, Spinner, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_PHOTO } from "../../utils/mutations";
import "./AddPhoto.css";

const AddPhoto = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [updateprofilepic, { loading }] = useMutation(UPDATE_PHOTO);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleFileUpload = async (e) => {
    e.preventDefault();
    handleClose();
    
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
      <Button className="photo-add" variant="light" onClick={handleShow}>
        Add Profile Pic
      </Button>

      <Modal
        className="Addphoto"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="photo-text">Add your profile photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-2" onSubmit={handleFileUpload}>
            <Form.Group>
              <Form.Control
                className="photo-upload-text"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit" className="photo-button p-0" variant="light">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPhoto;
