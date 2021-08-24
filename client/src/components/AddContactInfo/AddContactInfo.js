import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_INFO } from "../../utils/mutations";
import "./AddContactInfo.css";

const AddContactInfo = ({ currentUserContactInfo }) => {
  const [contactInfo, setContactInfo] = useState(currentUserContactInfo);
  const [show, setShow] = useState(false);

  const [updateUser] = useMutation(UPDATE_CONTACT_INFO);

  // update state based on form input changes
  const handleChange = (event) => {
    setContactInfo(event.target.value);
  };
  const handleFormSubmit = async (e) => {
    // close modal
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

  // MODAL DISPLAY
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="w-50 btn-sm " variant="dark" onClick={handleShow}>
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
          <Modal.Title>Add your Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <FormControl
              name="contactinfo"
              rows="5"
              as="textarea"
              aria-label="With textarea"
              onChange={handleChange}
              value={contactInfo || ""}
              placeholder={currentUserContactInfo}
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

export default AddContactInfo;
