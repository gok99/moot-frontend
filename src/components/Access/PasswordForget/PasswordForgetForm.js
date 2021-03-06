import React, { useRef, useState } from 'react';
import { Button, Form, Overlay, Spinner, Tooltip } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Component for rendering and handling the Password Forget Form.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const PasswordForgetFormBase = (props) => {

  /**
   * Boolean value to check if this component is being rendered in the My Account Page.
   */
  const accountPage = props.accountPage;

  /**
   * Reference to set the target for the Tooltip.
   */
  const target = useRef(null);

  /**
   * State to store any errors on form submission.
   */
  const [error, setError] = useState(null);

  /**
   * State to store the current email state (String).
   */
  const [creds, setCreds] = useState({
    email: ''
  });
  
  /**
   * State to store the current form submission state and error state (check if there are errors).
   */
  const [formState, setFormState] = useState({
    submit: false,
    error: false
  });

  const assert_valid = (creds) => {
    const emailRegex = new RegExp('^(e|E)[0-9]{7}@u.nus.edu$', 'g');
    const invalids = {
      notNUSEmail: !emailRegex.test(creds.email)
    };

    if (invalids.notNUSEmail) {
      setError(new Error('You must use a valid NUS email address (starting with E or e). Please try again!')); 
      return false;
    } else {
      return true;
    }
  }

  const onSubmit = (event) => {
    setFormState({
      submit: true,
      error: false
    });
    if (assert_valid(creds)) {
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
      <Form.Group className="input-access" controlId="forgotBasicEmail">
        <Form.Control
          className="text-input-access"
          name="email" 
          type="email"
          value={creds.email}
          placeholder="NUSNET Email Address"
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
