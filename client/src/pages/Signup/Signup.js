import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { Container, Card } from "react-bootstrap";
import "./Signup.css";

function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    const userId = mutationResponse.data.addUser.user._id;
    Auth.login(token, userId);
    } catch (e) {
      console.log(e);
    }
   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className="height" fluid>
      <Card className="background">
        <div className="text-style">
          <Link to="/login" className="login">
            ← Go to Login
          </Link>

          <h2 className="signup-style">Signup</h2>
          <form className="form" onSubmit={handleFormSubmit}>
            <label className="label" htmlFor="username">
              Username
              <br />
              <input
                className="input"
                placeholder="Username"
                name="username"
                type="text"
                id="username"
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="label" htmlFor="email">
              Email
              <br />
              <input
                className="input"
                placeholder="youremail@email.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="label" htmlFor="pwd">
              Password
              <br />
              <input
                className="input"
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </label>

            {error ? (
              <div>
                <p className="error-text">This user already exists</p>
              </div>
            ) : null}
            <br />
            <div>
              <br />
              <button className="rounded submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default Signup;
