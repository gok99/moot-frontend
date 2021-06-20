import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import TelegramForm from './TelegramForm';
import ResendEmailForm from './ResendEmailForm';
// import OnboardingTelegramButton from './OnboardingTelegramButton';
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


class OnboardingTelegramFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { id: '' }, text: text1, form: <div><ResendEmailForm />{/*<OnboardingTelegramButton />*/}</div> , visibleID: false };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const emailVerified = fb.auth.currentUser.emailVerified;
    fb.user(uid).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .then((data) => this.setState({ data }))
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillUnmount() {
    this.authListener && this.authListener();
  }

  render() {
    return (
      <div>
       <Row>
         <p className="onbtext">
          Would you like to link your account to your telegram account? We recommend that you do this now - it should only take a few seconds!
          <br /><br />
        </p>
        <p className="onbtext">
          { this.state.text }
          { this.state.visibleID ?  command + this.state.data.id : null }
          <br /><br /><br /><br />
        </p>
      </Row>
      <Row className="justify-content-md-center">``
        { this.state.form }
      </ Row>
      </div>
    );
  }
}

const OnboardingTelegramForm = compose(
  withFirebase,
)(OnboardingTelegramFormBase);

export default OnboardingTelegramForm;