import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProfilePreview from '../Account/ProfilePreview';
import LibraryArea from './LibraryArea';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Library = (props) => {
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <ProfilePreview overlayState=""></ProfilePreview>
            <Col xs={8}>
              <LibraryArea />
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