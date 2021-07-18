import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProfilePreview from '../../Account/ProfilePreview';
import PostArea from '../../Post/PostArea';

import '../../Styles/styles.css';

const HomePage = (props) => {
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <ProfilePreview overlayState=""></ProfilePreview>
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

export default HomePage;