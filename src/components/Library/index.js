import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePreview from '../Account/ProfilePreview';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Library = (props) => {
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
              <div className="contentbox d-flex justify-content-center">
                <h5>--- LIBRARY ---</h5>
              </div>
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

export default withAuthorization(dest)(Library);