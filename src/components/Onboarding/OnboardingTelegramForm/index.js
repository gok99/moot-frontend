import React from 'react';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays Onboarding Form 3.
 */
const OnboardingTelegramForm = (props) => {
  const onSubmit = props.onSubmit;
  const id = props.id;
  
  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding-mini" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">Next, you need to connect to telegram.</p>
        <p><br /></p>
        <p className="subheader-onboarding">Please click "Connect to Telegram" and enter the following command to the bot: /r {id}</p>
        <p><br /></p>
        <p className="subheader-onboarding">You can choose to do this later, but you won't be able to use most of moot features until you've connected to telegram!</p>
        <p><br /></p>
      </Row>
      <Row>
        <Button href="https://t.me/mootapp_bot" target="_blank" rel="noopener noreferrer" className="btn-onboarding btn-link" type="button">Connect to Telegram</Button>
        <Button className="btn-onboarding" type="button" onClick={onSubmit}>Proceed</Button>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={33} />
        <p><br /></p>
      </Row>
    </Col>
  );
};

export default OnboardingTelegramForm;