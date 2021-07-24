import React, { useRef, useState } from 'react';
import { Button, Form, Overlay, Spinner, Tooltip } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Component for rendering and handling the Password Change Form.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const PasswordChangeForm = (props) => {
  const accountPage = props.accountPage;
  const [creds, setCreds] = useState({
    passwordOne: '',
    passwordTwo: ''
  });  
  const [formState, setFormState] = useState({
    submit: false,
    error: false
  });
  const [error, setError] = useState(null);
  const target = useRef(null);

  const assert_valid = (creds) => {
    const invalids = {
      passwordsNoMatch: creds.passwordOne !== creds.passwordTwo,
      passwordLengthShort: creds.passwordOne.length < 8
    };

    if (invalids.passwordsNoMatch) {
      setError(new Error('The two passwords don\'t match. Please try again!'));
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
    if (assert_valid(creds)) {
      props.firebase
        .doPasswordUpdate(creds.passwordOne)
        .then(() => {
          setCreds({
            passwordOne: '',
            passwordTwo: ''
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
      <Form.Group className="input-access" controlId="resetPwBasicPasswordOne">
        <Form.Control
          className="text-input-access"
          name="passwordOne" 
          type="text"
          value={creds.passwordOne}
          placeholder="New Password"
          onChange={onChange} />
      </Form.Group>

      <Form.Group className="input-access" controlId="resetPwBasicPasswordTwo">
        <Form.Control
          className="text-input-access"
          name="passwordTwo" 
          type="text"
          value={creds.passwordTwo}
          placeholder="Confirm New Password"
          onChange={onChange} />
      </Form.Group>

      { formState.submit
        ? <Button ref={target} className={accountPage ? "btn-access account loading mt-2 mb-2" : "btn-access loading mt-2 mb-2"} disabled>
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
              className={accountPage ? "btn-access account mt-2 mb-2" : "btn-access mt-2 mb-2"}
              type="submit"
              disabled={creds.passwordOne === '' || creds.passwordTwo === ''}>
              Change My Password
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

export default withFirebase(PasswordChangeForm);