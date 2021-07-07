import React, { useState } from 'react';
import { Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../../Firebase';
import * as ROUTES from '../../../../constants/routes'; 

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Container Component that retrieves user input (username and password).
 * On submission, it will log the user in and redirect them to the Home Page.
 */
const SignInFormBase = (props) => {
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        setCreds({
          email: '',
          password: ''
        });
        setError(null);
        history.push({ pathname: ROUTES.HOME });
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setCreds({
      ...creds,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="input-access" controlId="signInBasicEmail">
        <Form.Control
          name="email" 
          type="email"
          placeholder="NUSNET Email Address"
          value={creds.email}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signInBasicPassword">
        <Form.Control 
          name="password"
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={onChange} />
      </Form.Group>

      <Button
        className="btn-access mt-2 mb-2"
        type="submit"
        disabled={creds.password === '' || creds.email === ''}>
        Log In
      </Button>

      { error && <h5> { error.message } </h5> }
    </Form>   
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
