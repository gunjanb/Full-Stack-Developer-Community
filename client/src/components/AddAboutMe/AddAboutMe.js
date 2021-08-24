import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_ABOUT_ME } from "../../utils/mutations";
import "./AddAboutMe.css";

const AddAboutMe = ({ currentUserAboutMe }) => {
  const [aboutme, setAboutMe] = useState(currentUserAboutMe);
  const [show, setShow] = useState(false);

  const [updateUser] = useMutation(UPDATE_ABOUT_ME);

  // update state based on form input changes
  const handleChange = (event) => {
    setAboutMe(event.target.value);
  };
  const handleFormSubmit = async (e) => {
    // close modal
    handleClose();
    e.preventDefault();

    try {
      await updateUser({
        variables: {
          aboutMe: aboutme,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // MODAL DISPLAY
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="w-50 btn-sm " variant="dark" onClick={handleShow}>
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
          <Modal.Title>Add About yourself</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <FormControl
              name="aboutme"
              rows="5"
              as="textarea"
              aria-label="With textarea"
              onChange={handleChange}
              value={aboutme || ""}
              placeholder={currentUserAboutMe}
            />
            <Button className="mt-3" type="submit" variant="dark btn-sm ">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAboutMe;
