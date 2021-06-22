import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePreview from '../Account/ProfilePreview';
import PostArea from '../Post/PostArea';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Home = () => (
  <Container className="homepage">
    <Row className="divider"></Row>
    <Row>
      <Col>{/* Blank divider */}</Col>
      <Col xs={9}>
        <Row>
          <Col xs={4} className="d-flex justify-content-center">
            <ProfilePreview />
          </Col>
          <Col xs={8}>
            <PostArea />
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