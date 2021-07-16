import React, { useState } from 'react';
import { Button, Row, Col, Form, ProgressBar } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays Onboarding Form 4.
 */
const OnboardingDescriptionForm = (props) => {
  const [desc, setDesc] = useState({
    description: ''
  });
  const onSubmit = props.onSubmit;

  const onFormSubmit = (event) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.userProfile(uid)
    .update({
      description: desc.description
    })
    .catch((error) => {
      console.log(error);
    });
    onSubmit();
    event.preventDefault();
  };

  const onChange = (event) => {
    setDesc({
      description: event.target.value
    });
  };

  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding-mini" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">Tell us about yourself!</p>
        <p><br /></p>
        <p className="subheader-onboarding">How would you describe yourself to a stranger? What are your interests and go-to conversation starters? Try not to give away details that could identify you too easily.</p>
        <p><br /></p>
        <p className="subheader-onboarding">Of course, you can choose to do this later as well!</p>
        <p><br /></p>
      </Row>
      <Row className="d-flex justify-content-center">
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="description">
            <Form.Control
              name="currentDescription" 
              type="text"
              as="textarea"
              placeholder="Describe yourself!"
              // defaultValue={ desc.description }
              onChange={onChange} />
          </Form.Group>
          <Button  
            className="btn-onboarding mt-4 mb-2"
            type="submit">
            Save & Proceed
          </Button>
        </Form>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={50} />
        <p><br /></p>
      </Row>
    </Col>
  );
};

export default withFirebase(OnboardingDescriptionForm);