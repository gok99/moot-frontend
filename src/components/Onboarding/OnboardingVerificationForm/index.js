import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays Onboarding Form 2.
 */
const OnboardingVerificationForm = (props) => {
  const fb = props.firebase;
  const onSubmit = props.onSubmit;

  const onVerify = (event) => {
    props.firebase.doSendVerificationEmail()
    .then(() => {
      alert("A verification email has been sent to your email. Please check your inbox.");
    })
    .catch(error => {
      alert(error);
    });
    event.preventDefault();
  };

  const onPress = (event) => {
    fb.auth.currentUser.reload().then(() => {
      if (!fb.auth.currentUser.emailVerified) {
      alert("You are not verified. Make sure you've verified your email, and try again.");
    } else {
      onSubmit();
    }
    });
  }

  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding-mini" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">To use moot, you need to first verify your email.</p>
        <p><br /></p>
        <p className="subheader-onboarding">If you have already verified, click "Check": the system will check if you are verified and let you proceed. Otherwise, you can press "Resend Verification" to get a new verification email if needed.</p>
        <p><br /></p>
      </Row>
      <Row>
        <Button className="btn-onboarding" type="button" onClick={onVerify}>Resend Verification</Button>
        <Button className="btn-onboarding" type="button" onClick={onPress}>Check</Button>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={25} />
        <p><br /></p>
      </Row>
    </Col>
  );
};

export default withFirebase(OnboardingVerificationForm);