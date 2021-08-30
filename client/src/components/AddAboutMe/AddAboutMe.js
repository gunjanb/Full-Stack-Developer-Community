import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_ABOUT_ME } from "../../utils/mutations";
import "./AddAboutMe.css";

const AddAboutMe = ({ currentUserAboutMe }) => {
  const [aboutme, setAboutMe] = useState(currentUserAboutMe);
  const [show, setShow] = useState(false);
  const [updateaboutme] = useMutation(UPDATE_ABOUT_ME);

  const handleChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    handleClose();
    e.preventDefault();

    try {
      await updateaboutme({
        variables: {
          aboutMe: aboutme,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="about-add" variant="light" onClick={handleShow}>
        About Me
      </Button>

      <Modal
        className="aboutme"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="about-text">Add About yourself</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-2" onSubmit={handleFormSubmit}>
            <FormControl
              className="about-upload-text"
              name="aboutme"
              rows="5"
              as="textarea"
              aria-label="textarea"
              onChange={handleChange}
              value={aboutme || ""}
              placeholder={currentUserAboutMe}
            />
            <Button className="about-button p-0" type="submit" variant="light">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAboutMe;
