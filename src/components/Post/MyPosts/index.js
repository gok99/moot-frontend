import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProfilePreview from '../../Account/ProfilePreview';
import { withAuthorization } from '../../Session';

import MyPostArea from './MyPostArea';

import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';

const MyPosts = (props) => {
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <ProfilePreview overlayState=""></ProfilePreview>
            <Col xs={8}>
              <h2>My Posts</h2>
              <hr />
              <MyPostArea />
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(MyPosts);