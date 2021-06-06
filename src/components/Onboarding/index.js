import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';

const OnboardingPage = () => (
  <div>
    <Container className="registerbox">
      <OnboardingForm />
    </ Container>
  </div>
);

const ONBOARDING1_STATE = {
  current: 1,
  header: "Welcome to moot!",
  text1: "Before you proceed, we would like to know what you are interested in. Don't worry, you can change and customise your interest tags any time after registration!",
  text2: "Also, you should know that here on moot, we respect your privacy. All of your interest tags will be invisible to others, unless otherwise specified.",
  buttontext1: "Skip this step",
  buttontext2: "Customize tags"
};

const ONBOARDING2_STATE = {
  current: 2,
  header: "Please choose the tags that you think are personally interesting to you.",
  text1: "Listed below are the 20 most commonly chosen tags. You can find and add more specific tags as you use moot!",
  text2: "",
  buttontext1: "Skip this step",
  buttontext2: "Proceed with these tags"
};

const ONBOARDING3_STATE = {
  current: 3,
  header: "Would you like to link your account to your telegram account now?",
  text1: "...",
  text2: "",
  buttontext1: "Skip this step",
  buttontext2: "Connect to Telegram!"
};

class OnboardingFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = ONBOARDING1_STATE;
  }
 
  onBtnOneClick = event => {
    this.state.current == 1 
      ? this.setState(ONBOARDING3_STATE)
      : this.props.history.push(ROUTES.HOME);
  };

  onBtnTwoClick = event => {
    this.state.current == 1
      ? this.setState(ONBOARDING2_STATE)
      : this.state.current == 2
        ? this.setState(ONBOARDING3_STATE)
        : this.props.history.push(ROUTES.HOME);
  };

  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <p className="onbheader">
            {this.state.header}<br /><br />
          </p>
          <p className="onbtext">
            {this.state.text1}<br /><br />
            {this.state.text2}<br /><br />
          </p>
        </ Row>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-start">
            <Link className="link">
              <Button className="mootbutton" type="button" onClick={this.onBtnOneClick}>{this.state.buttontext1}</Button>
            </Link>
          </ Row>
          <Row className="justify-content-md-end">
            <Link className="link">
              <Button className="mootbutton" type="button" onClick={this.onBtnTwoClick}>{this.state.buttontext2}</Button>
            </Link>
          </ Row>
        </ Row>
      </div>
    );
  }
}

const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const OnboardingForm = compose(
  withRouter,
  withFirebase,
)(OnboardingFormBase);

export default withAuthorization(dest)(OnboardingPage);