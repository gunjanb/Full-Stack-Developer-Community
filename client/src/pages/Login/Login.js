import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Container, Card } from "react-bootstrap";
import './Login.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
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
    <Container fluid>
      <Card>
        <div
          style={{
          position: 'fixed'
          }}
        >
        <Link to="/signup">← Go to Signup</Link>

          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
    
            <label htmlFor="email">
              Email
              <br />
            <input
              placeholder="youremail@test.com"
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
            
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div className="flex-row flex-end">
              <br />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default Login;
