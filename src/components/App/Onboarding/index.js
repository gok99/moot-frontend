import React from 'react';
import { withAuthorization } from '../../Session';
import { Container, Row } from 'react-bootstrap';

import * as ROUTES from '../../../constants/routes'; 
import OnboardingForm from './OnboardingForm';

import '../../Styles/styles.css';

const OnboardingPage = () => (
  <div>
    <Container className="homepage">
      <Row className="divider"></Row>
      <OnboardingForm />
    </ Container>
  </div>
);

const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(OnboardingPage);