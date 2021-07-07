import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../../Firebase';
import * as ROUTES from '../../../../constants/routes'; 

import '../../../Styles/styles.css'
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
  const [error, setError] = useState(null);
  const history = useHistory();

  const assert_valid = (creds) => {
    const emailRegex = new RegExp('^(e|E)[0-9]{7}@u.nus.edu$', 'g');
    const invalids = {
      passwordsNoMatch: creds.passwordOne !== creds.passwordTwo,
      emptyPassword: creds.passwordOne === '',
      emptyEmail: creds.email === '',
      emptyUsername: creds.username === '',
      notNUSEmail: !emailRegex.test(creds.email)
    };

    if (invalids.passwordsNoMatch) {
      setError(new Error('The two passwords don\'t match. Please try again.'));
      return false;
    } else if (invalids.emptyPassword) {
      setError(new Error('The password field cannot be empty. Please try again.')); 
      return false;
    } else if (invalids.emptyEmail) {
      setError(new Error('The email field cannot be empty. Please try again.')); 
      return false;
    } else if (invalids.emptyUsername) {
      setError(new Error('The username field cannot be empty. Please try again.')); 
      return false;
    } else if (invalids.notNUSEmail) {
      setError(new Error('You must use a valid NUS email address (starting with \"E\"). Please try again.')); 
      return false;
    }
    return true;
  }

  const onSubmit = (event) => {
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
              username: creds.username,
              email: creds.email,
              id,
              uid,
              description: '',
              Pid: 0,
              teleUser: '',
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
        })
        .then(() => {
          props.firebase.doSendVerificationEmail();
        })
        .catch(error => {
          setError(error);
        });
    }
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
      <Form.Group className="input-access" controlId="signUpBasicUsername">
        <Form.Control
          name="username" 
          type="username"
          placeholder="Username"
          value={creds.username}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicEmail">
        <Form.Control
          name="email" 
          type="email"
          placeholder="Enter email"
          value={creds.email}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicPasswordOne">
        <Form.Control 
          name="passwordOne"
          type="password"
          placeholder="Enter Password"
          value={creds.passwordOne}
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access mt-2" controlId="signUpBasicPasswordTwo">
        <Form.Control 
          name="passwordTwo"
          type="password"
          placeholder="Re-Enter Password"
          value={creds.passwordTwo}
          onChange={onChange} />
      </Form.Group>

      <Button  
        className="button-access mt-2 mb-2"
        variant="primary"
        type="submit">
        Sign Up
      </Button>
      {error && <h5> {error.message} </h5>}
    </ Form>
  );
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
