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
      const userId = mutationResponse.data.login.user._id;
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
        <Link to="/signup" className="signup">← Go to Signup</Link>

          <h2 className="login-style">Login</h2>
          <form className="form" onSubmit={handleFormSubmit}>
    
            <label className="label" htmlFor="email">
              Email
              <br />
            <input
              className="input"
              placeholder="youremail@test.com"
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
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div>
              <br />
              <button className="rounded btn submit-button" type="submit">Submit</button>
            </div>
          </form>
          <br /> < br/> < br/> <br />
        </div>
      </Card>
    </Container>
  );
}

export default Login;
