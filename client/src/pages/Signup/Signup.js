import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { Container, Card } from "react-bootstrap";
import './Signup.css';


function Signup(props) {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container fluid>
      <Card>
        <div
          style={{
            position: 'fixed'
          }}
        >
        <Link to="/login">← Go to Login</Link>

          <h2>Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username">
              Username
              <br />
            <input
              placeholder="Username"
              name="username"
              type="text"
              id="username"
              onChange={handleChange}
            />
            </label>
            <br />
            <label htmlFor="email">
              Email
              <br />
            <input
              placeholder="youremail@email.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            </label>
            <br />
            <label htmlFor="pwd">
              Password
              <br />
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
            </label>
            <br />
            <br />
            <div className="flex-row flex-end">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default Signup;