import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Onboarding from '../../Onboarding';
import ProfilePreview from '../../Account/ProfilePreview';
import PostArea from '../../Post/PostArea';

import '../../Styles/styles.css';

const HomePageOnb = (props) => {
  const Side = props.side;
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Onboarding />
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <Side />
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

export default HomePageOnb;