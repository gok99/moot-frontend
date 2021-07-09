import React, { useState, useRef } from 'react';
import { Form, Button, Spinner, Overlay, Tooltip } from 'react-bootstrap';
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
  const [formState, setFormState] = useState({
    submit: false,
    error: false
  });
  const [error, setError] = useState(null);
  const history = useHistory();
  const target = useRef(null);

  const onSubmit = (event) => {
    setFormState({
      submit: true,
      error: false
    });
    props.firebase
      .doSignInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        setCreds({
          email: '',
          password: ''
        });
        setError(null);
        history.push({ pathname: ROUTES.HOME });
        setFormState({
          submit: false,
          error: false
        });
      })
      .catch((error) => {
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
      <Form.Group className="input-access" controlId="signInBasicEmail">
        <Form.Control
          className="inputtxt-access"
          name="email" 
          type="email"
          placeholder="NUSNET Email Address"
          value={creds.email}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signInBasicPassword">
        <Form.Control 
          className="inputtxt-access"
          name="password"
          type="password"
          placeholder="Password"
          value={creds.password}
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
              disabled={creds.password === '' || creds.email === ''}>
              Log In
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
    </Form>   
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
