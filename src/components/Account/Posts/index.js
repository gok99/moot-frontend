import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePreview from '../ProfilePreview';
import { withAuthorization } from '../../Session';

import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';

const MyPosts = (props) => {
  return (
    <Container className="b-home">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <Col xs={4} className="d-flex justify-content-center">
              <ProfilePreview overlayState=""></ProfilePreview>
            </Col>
            <Col xs={8}>
              <h2>My Posts</h2>
              <hr />
              <p className="text-placeholder">This feature is yet to be implemented :(</p>
              <p className="text-placeholder">This page should show all posts you've created, liked, or commented on!</p>
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

export default withAuthorization(dest)(MyPosts);