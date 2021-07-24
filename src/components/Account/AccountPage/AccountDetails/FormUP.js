import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

import { withFirebase } from '../../../Firebase';

import PasswordForgetForm from '../../../Access/PasswordForget/PasswordForgetForm';
import PasswordChangeForm from '../../../Access/PasswordForget/PasswordChangeForm';
 
import '../../../Styles/styles.css';
import '../../account.css';

const FormUP = (props) => {
  const username = props.username;
  const [currentUsername, setCurrentUsername] = useState(username);
  const [formState, setFormState] = useState(null);
  const [usernameState, setUsernameState] = useState(false);
  const [changeState, setChangeState] = useState(false);

  const onPasswordForgetForm = (event) => {
    setFormState(<PasswordForgetForm accountPage={true} />);
    event.preventDefault();
  };

  const onPasswordChangeForm = (event) => {
    setFormState(<PasswordChangeForm accountPage={true} />);
    event.preventDefault();
  };

  const onSubmit = (event) => {
    if (!usernameState) {
      setUsernameState(true);
    } else {
      const fb = props.firebase;
      const uid = fb.auth.currentUser.uid;
      fb.userProfile(uid).update({
        username: !changeState ? username : currentUsername
      })
      .catch((error) => {
        console.log(error);
      });
      setUsernameState(false);
    }
    event.preventDefault();
  };

  const onChange = (event) => {
    setCurrentUsername(event.target.value);
    setChangeState(true);
    event.preventDefault();
  };

  return (
    <>
      <Row>    
        <Col md={6}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col>
                <p className="text-account">Username</p>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button className="btn-username" type="submit">{usernameState ? "Submit" : "Edit"}</Button>
              </Col>
            </Row>
            <Row>
              <Form.Group className={usernameState ? "input-account mt-2" : "input-account-disabled mt-2"} controlId="username">
                <Form.Control
                  name="username"
                  type="text"
                  className="input-text-account"
                  value={!changeState ? username : currentUsername} 
                  maxlength="16"
                  disabled={!usernameState}
                  onChange={onChange} />
              </Form.Group>
            </Row>
          </Form>
        </Col>
        <Col md={3}>
          <Button className="btn-passwordchoice" onClick={onPasswordForgetForm}>
            Forgot Password?
          </Button>
        </Col>
        <Col md={3}>
          <Button className="btn-passwordchoice" onClick={onPasswordChangeForm}>
            Change Password?
          </Button>
        </Col>
      </Row>
      { !!formState ? <hr /> : null }
      <Row className="mt-4">
        {formState}
      </Row>
    </>
  );
};

export default withFirebase(FormUP);