import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePreview from '../ProfilePreview';
import { withAuthorization } from '../../Session';

import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';

const Settings = (props) => {
  return (
    <Container className="b-home">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <Col xs={4} className="d-flex justify-content-center">
              <ProfilePreview />
            </Col>
            <Col xs={8}>
              <p className="text-general-header">Settings</p>
              <hr />
              <p className="text-placeholder">This feature is yet to be implemented :(</p>
              <p className="text-placeholder">This page should let you change the basic settings for your moot experience, like view mode and other preferences!</p>
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </ Container>
  );
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(Settings);