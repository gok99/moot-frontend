import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import Onboarding from '../../Onboarding';
import ProfilePreview from '../../Account/ProfilePreview';
import PostArea from '../../Post/PostArea';
import { withAuthorization } from '../../Session';

import '../../Styles/styles.css';
import '../home.css';

const HomePageOnb = (props) => {
  return (
    <Container className="b-home">
      <Row className="b-divider"></Row>
      <Onboarding />
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <ProfilePreview overlayState="element-overlay"></ProfilePreview>
            <Col xs={8}>{/* <PostArea /> */}<p>PostArea (onb)</p></Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

//<Container className="b-overlay">

export default HomePageOnb;