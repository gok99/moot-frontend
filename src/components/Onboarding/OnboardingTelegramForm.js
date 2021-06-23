import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import TelegramForm from './TelegramForm';
import ResendEmailForm from './ResendEmailForm';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';

const text1 = "You have not verified your email yet. Please do so in order to connect to telegram! Press the button below to resend the verification email if needed.";
const text2 = "To connect to telegram, please ensure that you have already verified your email, and click the button below to access the main telegram bot. Enter the following command: ";
const command = "/r "

class OnboardingTelegramFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      teleformid: 1,
      data: { id: '' },
      text: text1, 
      buttontext: "I'm verified!",
      form: <ResendEmailForm />, 
      visibleID: false
    };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
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

  onClick = async(event) => {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const fbuser = this.props.firebase.auth.currentUser;
    await fbuser.reload();
    const emailVerified = fbuser.emailVerified;
    if (this.state.teleformid === 1 && emailVerified) {
      this.setState({
        teleformid: 2,
        text: text2, 
        buttontext: "Proceed to moot",
        form: <TelegramForm />, 
        visibleID: true
      })
    } else if (this.state.teleformid === 2 && emailVerified) {
      fb.user(uid).update({ onboarded: true });
      this.props.history.push(ROUTES.HOME);
    } else if (!emailVerified) {
      alert("Please make sure your email has been verified, and try again.");
    } else {

    }
  };

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
      <Row className="justify-content-md-center">
        <Col className="d-flex mb-2 justify-content-center">
          { this.state.form }
        </Col>
        <Col className="d-flex mb-2 justify-content-center">
          <Button className="likebutton medbutton" type="button" onClick={this.onClick}>{ this.state.buttontext }</Button>
        </Col>
      </ Row>
      </div>
    );
  }
}

const OnboardingTelegramForm = compose(
  withRouter,
  withFirebase,
)(OnboardingTelegramFormBase);

export default OnboardingTelegramForm;