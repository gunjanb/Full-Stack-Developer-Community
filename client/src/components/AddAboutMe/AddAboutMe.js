import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_ABOUT_ME } from "../../utils/mutations";
import "./AddAboutMe.css";

const AddAboutMe = ({ currentUserAboutMe }) => {
  const [aboutme, setAboutMe] = useState(currentUserAboutMe);
  const [show, setShow] = useState(false);
  const [updateaboutme] = useMutation(UPDATE_ABOUT_ME);

  // update state based on form input changes
  const handleChange = (event) => {
    setAboutMe(event.target.value);
  };

  //submit form
  const handleFormSubmit = async (e) => {
    // close modal
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

  // set show to true or false
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
              aria-label="textarea"
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
