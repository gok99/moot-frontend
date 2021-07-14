import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Onboarding from '../../Onboarding';
import ProfilePreview from '../../Account/ProfilePreview';
import PostArea from '../../Post/PostArea';

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
            <ProfilePreview profile={props.profile} overlayState="element-overlay"></ProfilePreview>
            <Col xs={8}>
              <PostArea />
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

//<Container className="b-overlay">

export default HomePageOnb;