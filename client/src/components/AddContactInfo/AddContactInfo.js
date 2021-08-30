import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_INFO } from "../../utils/mutations";
import "./AddContactInfo.css";

const AddContactInfo = ({ currentUserContactInfo }) => {
  const [contactInfo, setContactInfo] = useState(currentUserContactInfo);
  const [show, setShow] = useState(false);

  const [updateUser] = useMutation(UPDATE_CONTACT_INFO);

  const handleChange = (event) => {
    setContactInfo(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    handleClose();
    e.preventDefault();

    try {
      await updateUser({
        variables: {
          contactInfo: contactInfo,
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
      <Button className="contact-add" variant="light" onClick={handleShow}>
        Contact Info
      </Button>

      <Modal
        className="contactInfo"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="contact-text">Add your Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-2" onSubmit={handleFormSubmit}>
            <FormControl
              className="contact-upload-add"
              name="contactinfo"
              rows="5"
              as="textarea"
              aria-label="textarea"
              onChange={handleChange}
              value={contactInfo || ""}
              placeholder={currentUserContactInfo}
            />
            <Button className="contact-button p-0" type="submit" variant="light">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContactInfo;
