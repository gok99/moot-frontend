import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withFirebase } from '../../../Firebase';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Container Component that retrieves user input (username and password).
 * On submission, it will log the user in and redirect them to the Home Page.
 */
const PasswordForgetFormBase = (props) => {
  const [creds, setCreds] = useState({
    email: ''
  });
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    props.firebase
      .doPasswordReset(creds.email)
      .then(() => {
        setCreds({
          email: ''
        });
      })
      .catch(error => {
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
      <Form.Group className="input-access" controlId="forgotBasicEmail">
        <Form.Control
          name="email" 
          type="email"
          value={creds.email}
          placeholder="NUSNET Email Address"
          onChange={onChange} />
      </Form.Group>

      <Button  
        className="btn-access mt-2 mb-2"
        variant="primary"
        type="submit"
        disabled={creds.email === ''}>
        Reset My Password
      </Button>
      {error && <h5> {error.message} </h5>}
    </ Form>
  );
};

export default withFirebase(PasswordForgetFormBase);
