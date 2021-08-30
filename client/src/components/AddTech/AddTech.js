import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_TECH } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_TECHS } from "../../utils/queries";
import "./AddTech.css"

const AddTech = ({ currentUserAvailabletechs }) => {
  const [techselected, setTech] = useState();
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(QUERY_TECHS);
  const [updatetech] = useMutation(UPDATE_TECH);

   const handleFormSubmit = async (e) => {
    handleClose();
    e.preventDefault();
    const techs = e.target.elements["updatedTechs"];

    let updatedTechs = [];

    for (let i = 0; i < techs.length; i++) {
      techs[i].checked && updatedTechs.push(techs[i].value);
    }

    try {
      await updatetech({
        variables: {
          techs: updatedTechs,
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
      <Button className="tech-add" variant="light" onClick={handleShow}>
        Add Tech
      </Button>

      <Modal
        className="updatetech"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="tech-text">Select tech</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-2" onSubmit={handleFormSubmit}>
            <Form.Group>
              {data?.techs.map((tech) => (
                <div key={tech._id} className="mb-3">
                  <Form.Check
                    className="tech-upload-text"
                    name="updatedTechs"
                    label={tech.name}
                    value={tech._id}
                  />
                </div>
              ))}
            </Form.Group>
            <Button className="tech-add-button p-0" type="submit" variant="light">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTech;
