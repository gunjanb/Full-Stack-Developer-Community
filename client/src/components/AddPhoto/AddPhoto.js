import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_PHOTO } from "../../utils/mutations";
import "./AddPhoto.css";

const AddPhoto = () => {
  // MODAL TOGGLE

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updateUser, { loading }] = useMutation(UPDATE_PHOTO);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    var files = document.getElementById("uploadphoto").files;

    handleClose();

    const file = files[0];

    try {
      await updateUser({
        variables: {
          file,
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
        Add profile photo
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
              <Form.File className="text-center" id="uploadphoto" />
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
