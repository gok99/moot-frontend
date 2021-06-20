import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import OnboardingDescriptionForm from './OnboardingDescriptionForm';
import OnboardingTelegramForm from './OnboardingTelegramForm';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';

class OnboardingFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { onboarded: false }, formid: 1, formstate: <OnboardingDescriptionForm /> };
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

  onSkip = event => {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    if (this.state.formid === 1) {
      this.setState({ formid: 2, formstate: <OnboardingTelegramForm /> });
    } else {
      fb.user(uid).update({ onboarded: true });
      this.props.history.push(ROUTES.HOME);
    }
  };

  render() {
    return (
      <Row>
        <Col xs={3}></Col>
        <Col xs={6} className="contentbox onbbox">
          <Row>
            <Col xs={8}>
              <p className="onbheader">
                Welcome to moot!<br /><br />
              </p>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Link className="link">
                <Button className="mootbutton smallbutton" type="button" onClick={this.onSkip}>Skip this step &#62;&#62;&#62;</Button>
              </Link>
            </Col>
          </Row>
          { this.state.formstate }
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