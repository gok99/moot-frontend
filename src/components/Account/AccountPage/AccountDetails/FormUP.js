import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

import { withFirebase } from '../../../Firebase';

import PasswordForgetForm from '../../../Access/PasswordForget/PasswordForgetForm';
import PasswordChangeForm from '../../../Access/PasswordForget/PasswordChangeForm';
 
import '../../../Styles/styles.css';
import '../../account.css';

const FormUP = (props) => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [formState, setFormState] = useState(null);

  const onPasswordForgetForm = (event) => {
    setFormState(<PasswordForgetForm accountPage={true} />);
    event.preventDefault();
  };

  const onPasswordChangeForm = (event) => {
    setFormState(<PasswordChangeForm accountPage={true} />);
    event.preventDefault();
  };

  const onSubmit = (event) => {
    const fb = props.firebase;
    const uid = fb.auth.currentUser.uid;
    fb.userProfile(uid).update({
      username: currentUsername
    })
    .catch((error) => {
      console.log(error);
    });
    event.preventDefault();
  };

  const onChange = (event) => {
    setCurrentUsername(event.target.value);
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
                <Button className="btn-username" type="submit">Submit</Button>
              </Col>
            </Row>
            <Row>
              <Form.Group className="input-account mt-2" controlId="username">
                <Form.Control
                  name="username"
                  type="text"
                  className="input-text-account"
                  defaultValue={props.username} 
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