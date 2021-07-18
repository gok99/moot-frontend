import React from 'react';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays Onboarding Form 1.
 */
const OnboardingWelcomeForm = (props) => {
  const onSubmit = props.onSubmit;
  const username = props.username;

  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">Welcome, {username}!</p>
        <p className="header-onboarding">Let's get you started.</p>
        <p><br /></p>
      </Row>
      <Row>
        <Button className="btn-onboarding" type="button" onClick={onSubmit}>Begin Set-up</Button>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={0} />
        <p><br /></p>
      </Row>
    </Col>
  );
};

export default OnboardingWelcomeForm;