import React from 'react';
import { withAuthorization } from '../Session';
import { Row, Col } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes'; 
import OnboardingForm from './OnboardingForm';

import '../Styles/styles.css';
import './onboarding.css';

/**
 * Functional Presentational Component that displays the Overlay + Onboarding Form onto the Home Page.
 */
const Onboarding = () => {
  return (
    <div className="b-overlay-onboarding d-flex justify-content-md-center">
      <Col>
        <Row className="b-divider-onboarding"></Row>
        <OnboardingForm />
      </Col>
    </div>
  );
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
};

export default withAuthorization(dest)(Onboarding);