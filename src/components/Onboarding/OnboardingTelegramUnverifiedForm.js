import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import TelegramForm from './TelegramForm';
import ResendEmailForm from './ResendEmailForm';
import { withFirebase } from '../Firebase';

import '../Styles/styles.css';

const text1 = "You have not verified your email yet - please do so in order to connect to telegram! Press the button below to resend the verification email if needed.";
const text2 = "To connect to telegram, please ensure that you have already verified your email, and click the button below to access the main telegram bot, and input the command: ";
const command = "/r "


const OnboardingTelegramUnverifiedForm = () => (
  <Row>
    <Col className="d-flex justify-content-center">
      <ResendEmailForm />
    </Col>
    <Col className="d-flex justify-content-center">
      <Button className="mootbutton medbutton" type="button" onClick={this.onSubmit}>I'm verified!</Button>
    </Col>
  </Row>
);

export default OnboardingTelegramUnverifiedForm;