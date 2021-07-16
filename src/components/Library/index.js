import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePreview from '../Account/ProfilePreview';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Library = (props) => {
  const Side = props.side;
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <Col xs={4} className="d-flex justify-content-center">
            <Side />
            </Col>
            <Col xs={8}>
              <p className="text-placeholder">This feature is yet to be implemented :(</p>
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