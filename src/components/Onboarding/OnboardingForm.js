import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import OnboardingIconForm from './OnboardingIconForm';
import OnboardingTelegramForm from './OnboardingTelegramForm';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';

class OnboardingFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { iconForm: false, telegramForm: false, currentDescription: '', data: { description: '' } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const user = fb.user(uid).once('value').then((snapshot) => {
      if (snapshot.exists()) {
          return snapshot.val();
      } else {
          console.log("No data available");
      }
    }).catch((error) => {
        console.error(error);
    });
    user.then((data) => this.setState({ data }));
  }

  onSubmit = event => {
    if (!this.state.iconForm) {
      var { currentDescription } = this.state;
      const fb = this.props.firebase;
      var uid = fb.auth.currentUser.uid;
      fb.user(uid).update({
        description: currentDescription,
      }).catch((error) => console.log(error));;
      event.preventDefault();
      this.setState({ iconForm: true });
    } else {
      this.setState({ telegramForm: true });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }); 
  };

  onSkip = event => {
    if (!this.state.iconForm && !this.state.telegramForm) {
      this.setState({ iconForm: true });
    } else if (this.state.iconForm && !this.state.telegramForm) {
      this.setState({ telegramForm: true });
    } else {
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
                <Button className="likebutton smallbutton" type="button" onClick={this.onSkip}>Skip this step &#62;&#62;&#62;</Button>
              </Link>
            </Col>
          </Row>
          { this.state.telegramForm
              ? <OnboardingTelegramForm />
              : this.state.iconForm
                ? <div>
                    <OnboardingIconForm />
                    <Row className="justify-content-md-center mt-5">
                      <Form onSubmit={this.onSubmit}>
                        <Button  
                          className="likebutton medbutton mt-2 mb-2"
                          variant="primary"
                          type="submit">
                          Select
                        </Button>
                      </ Form>
                    </ Row>
                  </div>
                : <div>
                    <Row>
                      <p className="onbtext">
                        Before you proceed, we would like to know how you would describe yourself to someone who doesn't know you - things like what are your interests, fun conversation starters, etc. 
                        <br /><br />
                      </p>
                      <p className="onbtext">
                        This will be the information displayed to your anonymous chat partners, so try not to give away personal details!
                        <br /><br />
                      </p>
                      <p className="onbtext">
                        And don't worry, you can change your description any time after registration.
                        <br /><br /><br /><br />
                      </p>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Form onSubmit={this.onSubmit}>
                        <Form.Group className="textbox descriptionbox centeredform" controlId="description">
                          <Form.Control
                            name="currentDescription" 
                            type="text"
                            as="textarea"
                            placeholder="Describe yourself!"
                            defaultValue={ this.state.data.description }
                            onChange={this.onChange} />
                        </Form.Group>
                        <Button  
                          className="likebutton medbutton mt-2 mb-2"
                          variant="primary"
                          type="submit">
                          Save & Continue
                        </Button>
                      </ Form>
                    </ Row>
                </div>
            }
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