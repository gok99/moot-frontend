import React from 'react';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays Onboarding Form 7.
 */
const OnboardingLastForm = (props) => {
  const onSubmit = props.onSubmit;

  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">Your account's ready to go!</p>
        <p><br /></p>
      </Row>
      <Row>
        <Button className="btn-onboarding" type="button" onClick={onSubmit}>Start</Button>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={100} />
        <p><br /></p>
      </Row>
    </Col>
  );
};

export default OnboardingLastForm;