import React, { useState, useRef } from 'react';
import { Form, Button, Spinner, Overlay, Tooltip } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Container Component that retrieves user input (username and password).
 * On submission, it will log the user in and redirect them to the Home Page.
 */
const PasswordForgetFormBase = (props) => {
  const [creds, setCreds] = useState({
    email: ''
  });
  const [formState, setFormState] = useState({
    submit: false,
    error: false
  });
  const [error, setError] = useState(null);
  const target = useRef(null);

  const onSubmit = (event) => {
    setFormState({
      submit: true,
      error: false
    });
    props.firebase
      .doPasswordReset(creds.email)
      .then(() => {
        setCreds({
          email: ''
        });
        setFormState({
          submit: false,
          error: false
        });
      })
      .catch(error => {
        setError(error);
        setFormState({
          submit: false,
          error: true
        });
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setCreds({
      ...creds,
      [event.target.name]: event.target.value
    });
    setFormState({
      submit: false,
      error: false
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="input-access" controlId="forgotBasicEmail">
        <Form.Control
          className="inputtxt-access"
          name="email" 
          type="email"
          value={creds.email}
          placeholder="NUSNET Email Address"
          onChange={onChange} />
      </Form.Group>

      { formState.submit
        ? <Button ref={target} className="btn-access loading mt-2 mb-2" disabled>
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only"></span>
          </Button>
        : <>
            <Button
              ref={target}
              className="btn-access mt-2 mb-2"
              type="submit"
              disabled={creds.email === ''}>
              Reset My Password
            </Button>
            <Overlay target={target} show={formState.error} placement="right">
              {(props) => (
                <Tooltip id="tooltip-access" {...props}>
                  {error && <p> {error.message} </p>}
                </Tooltip>
              )}
            </Overlay>
          </>
      }
    </ Form>
  );
};

export default withFirebase(PasswordForgetFormBase);
