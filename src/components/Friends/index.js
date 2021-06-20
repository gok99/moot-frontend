import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import ProfilePreview from '../Account/ProfilePreview';
import FriendBoxCol from './FriendBoxCol';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const FriendsBase = () => (
  <div>
    <Container className="homepage">
      <Row className="divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={8}>
          <Row>
            <Col xs={4} className="d-flex justify-content-center">
              <ProfilePreview />
            </Col>
            <Col xs={8}>
              <Row>
                <FriendBoxCol />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </ Container>
  </div>
);

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const Friends = compose(
  withFirebase,
)(FriendsBase);

export default withAuthorization(dest)(Friends);