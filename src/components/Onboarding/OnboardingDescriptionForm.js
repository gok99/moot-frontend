import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import DescriptionForm from './DescriptionForm';

import '../Styles/styles.css';

class OnboardingDescriptionForm extends Component {
  render() {
    return (
      <div>
       <Row>
        <p className="onbtext">
          Before you proceed, we would like to know how you would describe yourself to someone who doesn't know you - things like what are your interests, fun conversation starters, etc. This will be the information displayed to your anonymous chat partners, so try not to give away personal details!
          <br /><br />
        </p>
        <p className="onbtext">
          And don't worry, you can change your description any time after registration.
          <br /><br /><br /><br />
        </p>
      </Row>
      <Row className="justify-content-md-center">
        <DescriptionForm />
      </ Row>
      </div>
    );
  }
}

export default OnboardingDescriptionForm;