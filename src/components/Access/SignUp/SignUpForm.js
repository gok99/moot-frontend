import React, { useState, useRef } from 'react';
import { Form, Button, Spinner, Overlay, Tooltip } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes'; 

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Container Component that retrieves user input (username, email, and passwords).
 * On submission, it will sign the user up and redirect them to the Onboarding Page.
 */
const SignUpFormBase = (props) => {
  const [creds, setCreds] = useState({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  });
  const [formState, setFormState] = useState({
    submit: false,
    error: false
  });
  const [error, setError] = useState(null);
  const history = useHistory();
  const target = useRef(null);

  const assert_valid = (creds) => {
    const emailRegex = new RegExp('^(e|E)[0-9]{7}@u.nus.edu$', 'g');
    const invalids = {
      passwordsNoMatch: creds.passwordOne !== creds.passwordTwo,
      notNUSEmail: !emailRegex.test(creds.email),
      passwordLengthShort: creds.passwordOne.length < 8
    };

    if (invalids.passwordsNoMatch) {
      setError(new Error('The two passwords don\'t match. Please try again!'));
      return false;
    } else if (invalids.notNUSEmail) {
      setError(new Error('You must use a valid NUS email address (starting with E or e). Please try again!')); 
      return false;
    } else if (invalids.passwordLengthShort) {
      setError(new Error('Passwords should be at least 8 characters long. Please try again!')); 
      return false;
    } 
    return true;
  }

  const onSubmit = (event) => {
    setFormState({
      submit: true,
      error: false
    });
    setCreds({
      username: creds.username,
      email: creds.email.toLowerCase(),
      passwordOne: creds.passwordOne,
      passwordTwo: creds.passwordTwo
    });

    /**
     * The status of the chat changes upon trigger, from vacant to occupied, and vice versa.
     */
    var newChat = {
      active: false,
      activematchUUID: '',
      matchBOT: 0,
      status: "vacant",
    };
    const id = Math.floor(100000000 + Math.random() * 900000000);
    var uid = '';

    if (assert_valid(creds)) {
      props.firebase
        .doCreateUserWithEmailAndPassword(creds.email, creds.passwordOne)
        .then(authUser => {
          // Creates a new user in the Firebase realtime database
          uid = authUser.user.uid;
          return props.firebase
            .user(uid)
            .set({
              profile: {
                username: creds.username,
                id,
                uid,
                pid: 1,
                email: creds.email,
                description: '',
                teleUser: '',
              },
              chats: {
                chat1: newChat,
                chat2: newChat,
                chat3: newChat,
                chat4: newChat,
                chat5: newChat,
              }
            });
        })
        .then(() => {
          return props.firebase
            .idToUid(id)
            .set({
              uid,
            });
        })
        .then(() => {
          setCreds({
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: ''
          });
          setError(null);
          history.push({ pathname: ROUTES.ONBOARDING });
          setFormState({
            submit: false,
            error: false
          });
        })
        .then(() => {
          props.firebase.doSendVerificationEmail();
        })
        .catch(error => {
          setError(error);
          setFormState({
            submit: false,
            error: true
          });
        });
    } else {
      setFormState({
        submit: false,
        error: true
      });
    }
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
      <Form.Group className="input-access" controlId="signUpBasicUsername">
        <Form.Control
          className="inputtxt-access"
          name="username" 
          type="username"
          placeholder="Username"
          value={creds.username}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicEmail">
        <Form.Control
          className="inputtxt-access"
          name="email" 
          type="email"
          placeholder="Enter email"
          value={creds.email}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicPasswordOne">
        <Form.Control 
          className="inputtxt-access"
          name="passwordOne"
          type="password"
          placeholder="Enter Password"
          value={creds.passwordOne}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicPasswordTwo">
        <Form.Control 
          className="inputtxt-access"
          name="passwordTwo"
          type="password"
          placeholder="Re-Enter Password"
          value={creds.passwordTwo}
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
              disabled={creds.username === '' || creds.email === '' || creds.passwordOne === '' || creds.passwordTwo === ''}>
              Sign Up
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

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
