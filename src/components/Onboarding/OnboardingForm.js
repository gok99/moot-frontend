import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import DescriptionForm from './DescriptionForm';
import TelegramForm from './TelegramForm';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';

const ONB_DESC_STATE = {
  current: 1,
  header: "Welcome to moot!",
  text1: "Before you proceed, we would like to know how you would describe yourself to someone who doesn't know you. This will be the information displayed to your anonymous chat partners, so try not to give away personal details! And don't worry, you can change your description any time after registration.",
  text2: "You can mention things like what are your interests, fun conversation starters, etc.",
  form: <DescriptionForm />
};

const ONB_TELE_STATE = {
  current: 2,
  header: "Welcome to moot!",
  text1: "Would you like to link your account to your telegram account? We recommend that you do this now - it should only take a few seconds!",
  text2: "",
  form: <TelegramForm />
};

// const ONB_TAG_STATE = {
//   current: 2,
//   header: "Please choose the tags that you think are personally interesting to you.",
//   text1: "Listed below are the 20 most commonly chosen tags. You can find and add more specific tags as you use moot!",
//   text2: "",
//   buttontext1: "Skip this step",
//   buttontext2: "Proceed with these tags"
// };

class OnboardingFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = ONB_DESC_STATE;
  }

  onSkip = event => {
    this.state.current === 1
      ? this.setState(ONB_TELE_STATE)
      : this.props.history.push(ROUTES.HOME);
  };

  render() {
    return (
      <Row>
        <Col xs={3}></Col>
        <Col xs={6} className="contentbox onbbox">
          <Row>
            <Col xs={8}>
              <p className="onbheader">
                {this.state.header}<br /><br />
              </p>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Link className="link">
                <Button className="mootbutton smallbutton" type="button" onClick={this.onSkip}>Skip this step &#62;&#62;&#62;</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <p className="onbtext">
              {this.state.text1}<br /><br />
              {this.state.text2}<br /><br /><br /><br />
            </p>
          </Row>
          <Row className="justify-content-md-center">
            {this.state.form}
          </ Row>
        </Col>
        <Col xs={3}></Col>
      </Row>
    );
  }
}

const OnboardingForm = compose(
  withRouter,
  withFirebase,
)(OnboardingFormBase);

export default OnboardingForm;