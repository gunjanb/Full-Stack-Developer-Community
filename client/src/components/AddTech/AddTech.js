import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_TECH } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_TECHS } from "../../utils/queries";

const AddTech = ({ currentUserAvailabletechs }) => {
  const [techselected, setTech] = useState();
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(QUERY_TECHS);
  const [updatetech] = useMutation(UPDATE_TECH);

  //on form submit
  const handleFormSubmit = async (e) => {
    // close modal
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

  // set show to true or false
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="w-50 btn-sm " variant="dark" onClick={handleShow}>
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
          <Modal.Title>Select tech</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* <div className="col-12 m-1 p-1">
              <label htmlFor="tech">Select a tech:</label>
              <select
                onChange={(e) => setTech(e.target.value)}
                value={techselected}
              >
                <option>Choose an option</option>
                {data?.techs.map((tech) => (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div> */}
            <Form.Group>
              {data?.techs.map((tech) => (
                <div key={tech._id} className="mb-3">
                  <Form.Check
                    // type="checkbox"
                    // disabled={tech.name === "All"}
                    name="updatedTechs"
                    label={tech.name}
                    value={tech._id}
                  />
                </div>
              ))}
            </Form.Group>
            <Button className="mt-3" type="submit" variant="dark btn-sm ">
              save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTech;
