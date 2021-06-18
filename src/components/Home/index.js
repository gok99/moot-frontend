import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProfilePreview } from '../Account';
import { PostCreation } from '../Post';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Home = () => (
  <Container className="homepage">
    <Row className="divider"></Row>
    <Row>
      <Col>{/* Blank divider */}</Col>
      <Col xs={8}>
        <Row>
          <Col xs={4} className="d-flex justify-content-center">
            <div className="fixed">
              <ProfilePreview />
              <br />
              <PostCreation />
            </div>
          </Col>
          <Col xs={8}>
            <div className="contentbox d-flex justify-content-center">
              <h5>--- USER FEED ---</h5>
            </div>
          </Col>
        </Row>
      </Col>
      <Col>{/* Blank divider */}</Col>
    </Row>
  </ Container>
);

const dest = authUser => { return {
  authorized: !!authUser,
  destination: ROUTES.SIGN_IN,
};
}

export default withAuthorization(dest)(Home);