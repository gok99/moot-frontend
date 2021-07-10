import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import ProfilePreview from '../../Account/ProfilePreview';
import PostArea from '../../Post/PostArea';
import { withAuthorization } from '../../Session';

import '../../Styles/styles.css';
import '../home.css';

const HomePage = (props) => {
  return (
    <Container className="b-home">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <ProfilePreview profile={props.profile} overlayState="b-overlay-none"></ProfilePreview>
            <Col xs={8}>{/* <PostArea /> */}<p>PostArea</p></Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

export default HomePage;